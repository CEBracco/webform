const APIResponse = require('@appSrc/utils/apiResponse');
const db = global.db;
var config = require('@localModules/config/Config.js');
var path = require('path');
var urljoin = require('url-join');


global.server.app.get(['/productsList/:authToken'], function (req, res) {
    var authToken = req.params.authToken;
    if (authToken == config.get('CHECKOUT_TOKEN')) {
        db.Group.findAll({
            order: [['name']]
        }).then(groups => {
            res.render("products_list", {
                checkoutToken: authToken,
                categories: groups
            });
            res.end();
        });
    } else {
        res.redirect('/');
        res.end();
    }
});

global.server.app.post(['/product/list'], function (req, res) {
    if (!req.body.authToken) {
        res.send(APIResponse.error(null, 'Debes completar todos los datos!'));
        res.end();
    } else {
        var authToken = req.body.authToken;
        if (authToken == config.get('CHECKOUT_TOKEN')) {
            db.Product.findAll({
                where: getProductFilters(req.body.filter),
                include: [db.Group],
                order: [[db.Group, 'order'], ['price']]
            }).then(products => {
                res.send(APIResponse.ok(products));
                res.end();
            });
        } else {
            res.send(APIResponse.error(null, 'Auth error'));
            res.end();
        }
    }
});

global.server.app.post(['/product/get'], function (req, res) {
    if (!req.body.authToken || !req.body.productId) {
        res.send(APIResponse.error(null, 'Debes completar todos los datos!'));
        res.end();
    } else {
        var authToken = req.body.authToken;
        if (authToken == config.get('CHECKOUT_TOKEN')) {
            db.Product.findOne({
                where: { id: req.body.productId},
                include: [db.Group],
            }).then(product => {
                let response = new APIResponse(product != null, product)
                res.send(response);
                res.end();
            });
        } else {
            res.send(APIResponse.error(null, 'Auth error'));
            res.end();
        }
    }
});

global.server.app.post(['/product/delete'], function (req, res) {
    if (!req.body.authToken || !req.body.productId) {
        res.send(APIResponse.error(null, 'Debes completar todos los datos!'));
        res.end();
    } else {
        var authToken = req.body.authToken;
        if (authToken == config.get('CHECKOUT_TOKEN')) {
            db.Product.findOne({
                where: { id: req.body.productId },
                include: [db.Group],
            }).then(product => {
                if (product) {
                    product.destroy().then(deletedProduct => {
                        res.send(APIResponse.ok(deletedProduct));
                        res.end();
                    })
                } else {
                    res.send(APIResponse.error(null, 'Not found'));
                    res.end();
                }
            });
        } else {
            res.send(APIResponse.error(null, 'Auth error'));
            res.end();
        }
    }
});

global.server.app.post(['/product/setEnabled'], function (req, res) {
    if (!req.body.authToken || !req.body.productId) {
        res.send(APIResponse.error(null, 'Debes completar todos los datos!'));
        res.end();
    } else {
        var authToken = req.body.authToken;
        if (authToken == config.get('CHECKOUT_TOKEN')) {
            db.Product.findOne({
                where: { id: req.body.productId },
            }).then(product => {
                if(product) {
                    product.enabled = req.body.enabled
                    product.save().then(persistedProduct => {
                        res.send(APIResponse.ok(persistedProduct));
                        res.end();
                    })
                } else {
                    res.send(APIResponse.error(null, 'Not found'));
                    res.end();
                }
            });
        } else {
            res.send(APIResponse.error(null, 'Auth error'));
            res.end();
        }
    }
});

global.server.app.post(['/product/createOrEdit'], function (req, res) {
    var receivedProduct = req.body.product
    if (!req.body.authToken || !isValidProduct(receivedProduct)) {
        res.send(APIResponse.error(null, 'Debes completar todos los datos!'));
        res.end();
    } else {
        var authToken = req.body.authToken;
        if (authToken == config.get('CHECKOUT_TOKEN')) {
            db.Product.findOne({ where: { 
                id: receivedProduct.id ? receivedProduct.id : 0 
            }}).then(product => {
                if (!product) {
                    product = db.Product.build({});
                }
                product.name = receivedProduct.name,
                product.acceptedPhotos = receivedProduct.acceptedPhotos,
                product.price = receivedProduct.price
                product.discount = receivedProduct.discount
                product.image = receivedProduct.image
                product.save().then(persistedProduct => {
                    receivedProduct.groupId = (receivedProduct.groupId != null && receivedProduct.groupId.trim() != '') ? receivedProduct.groupId : null
                    persistedProduct.setGroup(receivedProduct.groupId)
                    res.send(APIResponse.ok({ productId: persistedProduct.id }));
                    res.end();
                });
            });
        } else {
            res.send(APIResponse.error(null, 'Auth error'));
            res.end();
        }
    }
});

global.server.app.post(['/product/photo_upload/:authToken/:productId'], function (req, res) {
    var authToken = req.params.authToken;
    var productId = req.params.productId; 
    if (authToken == config.get('CHECKOUT_TOKEN')) {
        if (Object.keys(req.files).length == 0) {
            res.send(APIResponse.error(null, 'No se cargó ningún archivo'));
            res.end();
        }

        var photo = req.files.photo;        
        if (isValidImage(photo)) {
            var productsImageFolder = config.get('PRODUCTS_IMAGES_PATH');
            var photoName = getCleanFilename(photo)
            var photoURL = urljoin(config.get('HOST_URL'), config.get('PRODUCTS_IMAGES_URI'), photoName)
            photo.mv(path.join(productsImageFolder, photoName), function (err) {
                if (err) {
                    res.send(APIResponse.error(null, 'Error moviendo el archivo'));
                    res.end();
                }
                
                //refresh product
                db.Product.findOne({
                    where: {
                        id: productId
                    }
                }).then(product => {
                    product.image = photoURL
                    product.save().then(persistedProduct => {
                        res.send(APIResponse.ok({
                            url: photoURL
                        }));
                        res.end();
                    })
                })
            });
        }
    } else {
        res.send(APIResponse.error(null, 'Error de autenticación'));
        res.end();
    }
});

function getProductFilters(receivedFilters) {
    const Op = db.Sequelize.Op;
    var filter = { completed: true }
    if (receivedFilters) {
        if(receivedFilters.statuses) {
            filter.status = {
                [Op.in]: receivedFilters.statuses
            }
        }
    }
    // return filter;
    return {}
}

function isValidProduct(product) {
    return product != null
}

function isValidImage(img) {
    return img.mimetype.match(/image\//g) && img.name.match(/\.(jpe?g|png|gif)$/gi);
}

function getCleanFilename(file) {
    return file.name.replace(/(\\|\/|\ )/g, '');
}
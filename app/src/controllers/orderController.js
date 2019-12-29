const APIResponse = require('@appSrc/utils/apiResponse');
const db = global.db;
const CryptoUtils = require('@appSrc/utils/cryptoUtils');
const NotificationBroker = require('@appSrc/notification/notificationBroker');
const OrderPhotosUtils = require('@appSrc/utils/orderPhotosUtils');
const prefix = '/order';

global.server.app.post(prefix + '/create', function (req, res) {
    if (!req.body.productId || isNaN(parseInt(req.body.productId)) ) {
        res.send(APIResponse.error());
        res.end();
    }
    db.Order.findOne({ where: { hash: req.body.orderId } }).then(order => {
        if(!order){
            order = db.Order.build({ completed: false });
        }
        db.Product.findByPk(parseInt(req.body.productId)).then(product => {
            order.save().then(persistedOrder => {
                persistedOrder.hash = CryptoUtils.getHash(persistedOrder.id);
                persistedOrder.setProduct(product);
                persistedOrder.save().then(orderWithHash => {
                    res.send(APIResponse.ok({orderId: orderWithHash.hash}));
                    res.end();
                });
            });
        });
    });
});

global.server.app.post(prefix + '/setTypography', function (req, res) {
    if (!req.body.orderId || (req.body.typographyId && isNaN(parseInt(req.body.typographyId)))) {
        res.send(APIResponse.error());
        res.end();
    }
    if (req.body.typographyId) {
        db.Order.findOne({ where: { hash: req.body.orderId }, include: [db.Text] }).then(order => {
            db.Variation.findByPk(parseInt(req.body.typographyId)).then(typography => {
                if (typography.price > 0 && (!req.body.textValue || req.body.textValue.trim() == '')) {
                    res.send(APIResponse.error(null, 'Debes ingresar un texto!'));
                    res.end();
                }
                if(order.Text) {
                    order.Text.update({ value: req.body.textValue }).then(text => {
                        text.setTypography(typography).then(textPersisted => {
                            res.send(APIResponse.ok());
                            res.end();
                        })
                    })
                } else {
                    db.Text.create({ value: req.body.textValue }).then(text => {
                        text.setTypography(typography).then(textPersisted => {
                            order.setText(textPersisted).then(() => {
                                res.send(APIResponse.ok());
                                res.end();
                            });
                        })
                    });
                }
            })
        })
    } else {
        res.send(APIResponse.error());
        res.end();
    }
});

global.server.app.post(prefix + '/setBackground', function (req, res) {
    if (!req.body.orderId || (req.body.backgroundId && isNaN(parseInt(req.body.backgroundId)))) {
        res.send(APIResponse.error());
        res.end();
    }
    if (req.body.backgroundId) {
        db.Order.findOne({ where: { hash: req.body.orderId } }).then(order => {
            db.Variation.findByPk(parseInt(req.body.backgroundId)).then(background => {
                order.setBackground(background).then(orderWithBackground => {
                    res.send(APIResponse.ok());
                    res.end();
                });
            });
        })
    } else {
        res.send(APIResponse.error());
        res.end();
    }
});


global.server.app.post(prefix + '/setCustomerInfo', function (req, res) {
    if (!req.body.orderId || !validCustomerInfo(req.body)) {
        res.send(APIResponse.error(null, 'Debes completar todos los datos obligatorios!'));
        res.end();
    }
    db.Order.findOne({ where: { hash: req.body.orderId } }).then(order => {
        order.update({ 
            name: req.body.name,
            surname: req.body.surname,
            cellphone: req.body.cellphone,
            instagramUser: req.body.instagramUser
        }).then(() => {
            res.send(APIResponse.ok());
            res.end();
        });
    })
});

function validCustomerInfo(data) {
    return (data.name != null && data.name.trim() != '') 
        && (data.surname != null && data.surname.trim() != '')
        && (data.cellphone != null && data.cellphone.trim() != '')
}

global.server.app.post(prefix + '/setDeliveryAndPayment', function (req, res) {
    if (!req.body.orderId || !req.body.deliveryMethod || !req.body.paymentMethod) {
        res.send(APIResponse.error());
        res.end();
    }
    db.Order.findOne({
        where: { hash: req.body.orderId }, include: [
            db.Product,
            { model: db.Text, include: [{ model: db.Variation, as: 'Typography' }] },
            { model: db.Variation, as: 'Background' }
    ] }).then(order => {
        var sendNotification = !order.completed
        order.update({
            deliveryMethod: req.body.deliveryMethod,
            deliveryPoint: req.body.deliveryPoint,
            paymentMethod: req.body.paymentMethod,
            completed: true
        }).then(updatedOrder => {
            if (sendNotification){
                NotificationBroker.sendNewOrderNotification(updatedOrder);
            }
            OrderPhotosUtils.cleanTempPhotos(updatedOrder.hash)
            res.send(APIResponse.ok({ completeUrl: getCompleteUrl(updatedOrder) }));
            res.end();
        });
    })
});

function getCompleteUrl(order) {
    var paymentLink = '/order/completed';
    if (order.deliveryMethod == 'shipping' || order.paymentMethod == 'mercadopago') {
        var paymentLinks = order.Product.paymentLink.split(",");
        if (order.Text.Typography.price > 0 && order.Background.price > 0) {
            paymentLink = paymentLinks[2];
        } else {
            if (order.Text.Typography.price > 0 || order.Background.price > 0) {
                paymentLink = paymentLinks[1];
            } else {
                paymentLink = paymentLinks[0];            
            }
        }
        if (!paymentLink && paymentLinks[0]) {
            paymentLink = paymentLinks[0];
        }
    }
    return paymentLink
}
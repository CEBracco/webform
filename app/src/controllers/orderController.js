const APIResponse = require('@appSrc/utils/apiResponse');
const db = global.db;
const CryptoUtils = require('@appSrc/utils/cryptoUtils');
const prefix = '/order';

global.server.app.post(prefix + '/create', function (req, res) {
    if (!req.body.productId || isNaN(parseInt(req.body.productId)) ) {
        res.send(APIResponse.error());
        res.end();
    }
    db.Order.findOne({ where: { hash: req.body.orderId } }).then(order => {
        if(!order){
            order = db.Order.build();
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
    if (!req.body.textValue || req.body.textValue.trim() == '') {
        res.send(APIResponse.error(null, 'Debes ingresar un texto!'));
        res.end();
    }
    if (!req.body.orderId || (req.body.typographyId && isNaN(parseInt(req.body.typographyId)))) {
        res.send(APIResponse.error());
        res.end();
    }
    if (req.body.typographyId) {
        console.log(req.body.textValue);
        db.Order.findOne({ where: { hash: req.body.orderId } }).then(order => {
            db.Text.create({ value: req.body.textValue }).then(text => {
                db.Variation.findByPk(parseInt(req.body.typographyId)).then(typography => {
                    text.setTypography(typography).then(textPersisted => {
                        order.setText(textPersisted).then(() => {
                            res.send(APIResponse.ok());
                            res.end();
                        });
                    })
                });
            })
        })
    } else {
        res.send(APIResponse.ok());
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
        res.send(APIResponse.ok());
        res.end();
    }
});
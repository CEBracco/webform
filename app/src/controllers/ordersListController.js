const APIResponse = require('@appSrc/utils/apiResponse');
const db = global.db;
var config = require('@localModules/config/Config.js');


global.server.app.get(['/ordersList/:authToken'], function (req, res) {
    var authToken = req.params.authToken;
    if (authToken == config.get('CHECKOUT_TOKEN')) {
        db.Order.findAll({
            where: { completed: true },
            include: [
                db.Product,
                { model: db.Text, include: [{ model: db.Variation, as: 'Typography' }] },
                { model: db.Variation, as: 'Background' }
            ],
            order: [['createdAt', 'DESC']]
        }).then(orders => {
            res.render("orders_list", { orders: orders, checkoutToken: authToken, getTranslatedStatus: getTranslatedStatus });
            res.end();
        });
    } else {
        res.redirect('/');
        res.end();
    }
});

global.server.app.post('/order/setStatus', function (req, res) {
    if (!req.body.orderId || !req.body.status || !req.body.authToken) {
        res.send(APIResponse.error(null, 'Debes completar todos los datos!'));
        res.end();
    } else {
        if (req.body.authToken == config.get('CHECKOUT_TOKEN')) {
            db.Order.findOne({ where: { id: req.body.orderId } }).then(order => {
                order.update({
                    status: req.body.status
                }).then(() => {
                    res.send(APIResponse.ok());
                    res.end();
                });
            })
        } else {
            res.send(APIResponse.error(null, 'Auth error!'));
            res.end();
        }
    }
});

function getTranslatedStatus(status) {
    switch (status) {
        case 'pending':
            return 'Pendiente'
        case 'design':
            return 'Diseño'
        case 'print':
            return 'Impresion'
        case 'packaging':
            return 'Corte y Empaquetado'
        case 'ready':
            return 'Listo para la entrega'
        case 'delivered':
            return 'Entregado'
        default:
            return ''
    }
}
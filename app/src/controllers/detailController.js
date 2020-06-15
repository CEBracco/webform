const db = global.db;
var OrderUtils = require('@appSrc/utils/orderUtils');
const deliveryPoints = ['Plaza Constitución', 'Quilmes', 'Berazategui', 'Ranelagh', 'La Plata']

global.server.app.get(['/detail/:orderId'], function (req, res) {
    var orderId = req.params.orderId;
    db.Order.findOne({ 
        where: { hash: orderId }, 
        include: [  
            db.Product, 
            { model: db.Text, include: [{ model: db.Variation, as: 'Typography'}]}, 
            { model: db.Variation, as: 'Background'}
        ]
    }).then(order => {
        checkOrderAndRedirectOnFail(order, res);
        res.render("detail", { 
            order: order, 
            dataIsValid: validPaymentAndDeliverData(order), 
            deliveryPoints: deliveryPoints, 
            getPrice: OrderUtils.getPrice,
            getProductPrice: OrderUtils.getProductPrice,
            getElectronicPaymentPrice: OrderUtils.getElectronicPaymentPrice,
            addressObject: OrderUtils.getAddress(order)
        });
        res.end();
    });
});

function checkOrderAndRedirectOnFail(order, res) {
    if (!order) {
        res.redirect('/');
    }
    if (!order.Product) { // ultra rare
        res.redirect(`/`);
    }
    if (!order.Text) {
        res.redirect(`/typography/${order.hash}`);
    }
    if (!order.Background) {
        res.redirect(`/background/${order.hash}`);
    }
}

function validPaymentAndDeliverData(order) {
    if (order.deliveryMethod == 'takeAway') {
        return (order.paymentMethod == 'cash' || order.paymentMethod == 'mercadopago')
    }
    if(!OrderUtils.isValidAddress(order)){
        return false
    }
    if (order.deliveryMethod == 'deliveryPoint') {
        return (order.paymentMethod == 'cash' || order.paymentMethod == 'mercadopago')
            && (order.deliveryMethod == 'deliveryPoint' || order.deliveryMethod == 'shipping')
            && (order.deliveryPoint && order.deliveryPoint != '')
    } else {
        return (order.paymentMethod == 'cash' || order.paymentMethod == 'mercadopago') 
            && (order.deliveryMethod == 'deliveryPoint' || order.deliveryMethod == 'shipping')
    }
}
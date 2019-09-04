const db = global.db;

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
        if (!order) {
            res.redirect('/');
        }
        res.render("detail", { order: order, dataIsValid: validPaymentAndDeliverData(order) });
        res.end();
    });
});

function validPaymentAndDeliverData(order) {
    return (order.paymentMethod == 'cash' || order.paymentMethod == 'mercadopago') 
        && (order.deliveryMethod == 'deliveryPoint' || order.deliveryMethod == 'shipping')
}
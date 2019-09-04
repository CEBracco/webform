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
        checkOrderAndRedirectOnFail(order, res);
        res.render("detail", { order: order, dataIsValid: validPaymentAndDeliverData(order) });
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
    return (order.paymentMethod == 'cash' || order.paymentMethod == 'mercadopago') 
        && (order.deliveryMethod == 'deliveryPoint' || order.deliveryMethod == 'shipping')
}
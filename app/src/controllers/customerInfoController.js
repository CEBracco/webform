const db = global.db;

global.server.app.get(['/customer_info/:orderId'], function (req, res) {
    var orderId = req.params.orderId;
    db.Order.findOne({ where: { hash: orderId } }).then(order => {
        if (!order) {
            res.redirect('/');
        }
        res.render("customer_info", { order: order });
        res.end();
    });
});
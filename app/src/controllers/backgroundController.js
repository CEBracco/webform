const db = global.db;

global.server.app.get(['/background/:orderId'], function (req, res) {
    var orderId = req.params.orderId;
    db.Order.findOne({ where: { hash: orderId } }).then(order => {
        if (!order) {
            res.redirect('/');
        }
        db.Variation.findAll({ where: { type: 'background' } }).then(backgrounds => {
            res.render("background", { backgrounds: backgrounds, order: order });
            res.end();
        })
    });
});
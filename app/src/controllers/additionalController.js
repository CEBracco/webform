const db = global.db;

global.server.app.get(['/additional/:orderId'], function (req, res) {
    var orderId = req.params.orderId;
    db.Order.findOne({ where: { hash: orderId } }).then(order => {
        if (!order) {
            res.redirect('/');
        }
        // db.Variation.findAll({ where: { type: 'additional' } }).then(additionals => {
        //     res.render("additional", { additionals: additionals, order: order });
        //     res.end();
        // })

        res.render("additional", { additionals: [], order: order });
        res.end();
    });
});
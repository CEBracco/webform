const db = global.db;

global.server.app.get(['/typography/:orderId'], function (req, res) {
    var orderId = req.params.orderId;
    db.Order.findOne({ where: { hash: orderId }, include: [db.Text] }).then(order => {
        if (!order) {
            res.redirect('/');
        }
        db.Variation.findAll({ where: {type: 'typography'}})
        .then(typographies => {
            res.render("typography", { typographies: typographies, order: order });
            res.end();
        })
    });
});
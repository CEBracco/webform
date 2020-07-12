const db = global.db;

global.server.app.get(['/background/:orderId'], function (req, res) {
    var orderId = req.params.orderId;
    db.Order.findOne({ where: { hash: orderId } }).then(order => {
        if (!order) {
            res.redirect('/');
        }
        db.Variation.findAll({ where: { type: 'background' } }).then(backgrounds => {
            res.render("background", { backgrounds: orderBackgrounds(backgrounds), order: order });
            res.end();
        })
    });
});

function orderBackgrounds(backgrounds) {
    return backgrounds.sort(function (b1, b2) {
        return `${b1.name}0`.match(/\d+/)[0] - `${b2.name}0`.match(/\d+/)[0]
    })
}
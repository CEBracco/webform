const db = global.db;

global.server.app.get(['/typography/:orderId'], function (req, res) {
    var orderId = req.params.orderId;
    db.Order.findOne({ where: { hash: orderId }, include: [
        { model: db.Text, include: [{ model: db.Variation, as: 'Typography' }] }
    ] }).then(order => {
        if (!order) {
            res.redirect('/');
        }
        db.Variation.findAll({ where: { type: 'typography' }, order: [['index', 'ASC'], ['id']] })
        .then(typographies => {
            res.render("typography", { typographies: typographies, order: order, isValid: isValid(order) });
            res.end();
        })
    });
});

function isValid(order) {
    return order 
    && order.Text 
    && order.Text.Typography 
    && ((order.Text.Typography.price > 0 && order.Text.value != null && order.Text.value != '') || order.Text.Typography.price <= 0)
}
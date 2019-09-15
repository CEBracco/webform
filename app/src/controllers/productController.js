const db = global.db;

global.server.app.get(['/:orderId?', '/index.html/:orderId?'], function (req, res) {
    var orderId = req.params.orderId;
    if (!orderId) {
        orderId = 'default'
    }
    db.Product.findAll({ include: [db.Group], order: [[db.Group, 'order'], ['price']] }).then(products => {
        db.Order.findOne({ where: { hash: orderId } }).then(order => {
            res.render("product", { products: products, order: order });
            res.end();
        });
    })
});
const db = global.db;

global.server.app.get(['/', '/index.html','/:orderId', '/index.html/:orderId'], function (req, res) {
    var orderId = req.params.orderId;
    if (!orderId) {
        orderId = 'default'
    }
    db.Product.findAll().then(products => {
        db.Order.findOne({ where: { hash: orderId } }).then(order => {
            res.render("index", { products: products, order: order });
            res.end();
        });
    })
});
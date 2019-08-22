const Product = require('@appSrc/models/product');

global.server.app.get(['/', '/index.html'], function (req, res) {
    Product.findAll().then(products => {
        res.render("index", { products: products });
        res.end();
    })
});
const sequelize = global.dbConnection;
const Product = sequelize.import('../db/models/product');

global.server.app.get(['/', '/index.html'], function (req, res) {
    Product.findAll().then(products => {
        res.render("index", { products: products });
        res.end();
    })
});
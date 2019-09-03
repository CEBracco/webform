const db = global.db;
var config = require('@localModules/config/Config.js');

global.server.app.get(['/checkout/:authToken/:orderId'], function (req, res) {
    var authToken = req.params.authToken;
    var orderId = req.params.orderId;
    if (authToken == config.get('CHECKOUT_TOKEN')) {
        db.Order.findOne({ 
            where: { hash: orderId }, 
            include: [  
                db.Product, 
                { model: db.Text, include: [{ model: db.Variation, as: 'Typography'}]}, 
                { model: db.Variation, as: 'Background'}
            ]
        }).then(order => {
            if (!order) {
                res.redirect('/');
            }
            res.render("checkout", { order: order });
            res.end();
        });
    } else {
        res.redirect('/');
        res.end();
    }
});
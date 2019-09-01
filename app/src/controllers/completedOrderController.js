global.server.app.get(['/order/completed'], function (req, res) {
    console.log('kasdsd');
    
    res.render("completed_order", { });
    res.end();
});
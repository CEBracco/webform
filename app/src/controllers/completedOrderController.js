global.server.app.get(['/order/completed'], function (req, res) {
    res.render("completed_order", { });
    res.end();
});
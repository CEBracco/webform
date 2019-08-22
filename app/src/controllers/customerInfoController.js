global.server.app.get(['/customer_info'], function (req, res) {
    res.render("customer_info", {});
    res.end();
});

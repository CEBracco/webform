global.server.app.get(['/order/completed'], function (req, res) {
    res.render("completed_order", { 
        title: "¡Todo listo!", 
        detail: "Tu pedido fue registrado y nos comunicaremos con vos cuando este listo para ser entregado." 
    });
    res.end();
});

global.server.app.get(['/order/pending'], function (req, res) {
    res.render("completed_order", {
        title: "El pago se encuentra pendiente",
        detail: "Vamos a esperar el resultado del mismo y en caso afirmativo registraremos tu pedido."
    });
    res.end();
});
function getName(order) {
    var baseName = order.Product.name
    if (order.Background.price > 0) {
        baseName = baseName + ' + Fondo';
    }
    if (order.Text.Typography.price > 0) {
        baseName = baseName + ' + Tipografía';
    }
    return `${baseName} (${order.hash})`;
}

function getPrice(order) {
    return order.Product.price + order.Background.price + order.Text.Typography.price;
}

function getElectronicPaymentPrice(order, electronicPayment) {
    return order.Product.price + order.Background.price + order.Text.Typography.price;
}

module.exports = {
    getName: getName,
    getPrice: getPrice,
    getElectronicPaymentPrice: getElectronicPaymentPrice
}
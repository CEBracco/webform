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
    return getProductPrice(order.Product) + order.Background.price + order.Text.Typography.price;
}

function getElectronicPaymentPrice(order, electronicPayment) {
    return getProductPrice(order.Product) + order.Background.price + order.Text.Typography.price;
}

function getProductPrice(product) {
    var discount = product.discount ? product.discount : 0;
    var price = product.price - ((product.price * discount) / 100);
    return Math.floor(price / 5) * 5; //round to next multiple of 5
}

module.exports = {
    getName: getName,
    getPrice: getPrice,
    getElectronicPaymentPrice: getElectronicPaymentPrice,
    getProductPrice: getProductPrice
}
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

function getElectronicPaymentPrice(order, electronicPayment = null) {
    let commision = 5;
    return getPrice(order) + Math.floor((getPrice(order) * commision) / 100);
}

function getProductPrice(product) {
    var discount = product.discount ? product.discount : 0;
    var price = product.price - ((product.price * discount) / 100);
    return Math.floor(price / 5) * 5; //round to next multiple of 5
}

function getAddress(order) {
    var emptyAddress = { street: null, number: null, city: null, state: null }
    try {
        if (order.address && order.address != '') {
            return JSON.parse(order.address)
        } else {
            return emptyAddress
        }
    } catch (error) {
        return emptyAddress
    }
}

function isValidAddress(order) {
    if (order.address && order.address != '') {
        var objectAddress = getAddress(order)
        for (const key in objectAddress) {
            if (objectAddress.hasOwnProperty(key)) {
                if (objectAddress[key] == null || objectAddress[key] == '') {
                    return false
                }
            }
        }
        return true
    }
    return false
}

function getHumanReadableAddress(order) {
    var objectAddress = getAddress(order)
    if (objectAddress) {
        return `${objectAddress.street} ${objectAddress.number}, ${objectAddress.city}, ${objectAddress.state}`
    }
    return ''
}

module.exports = {
    getName: getName,
    getPrice: getPrice,
    getElectronicPaymentPrice: getElectronicPaymentPrice,
    getProductPrice: getProductPrice,
    getAddress: getAddress,
    isValidAddress: isValidAddress,
    getHumanReadableAddress: getHumanReadableAddress
}
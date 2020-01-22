var config = require('@localModules/config/Config');
var OrderUtils = require('@appSrc/utils/orderUtils');
var mercadopago = require('mercadopago');
const db = global.db;

mercadopago.configure(config.getObject('MERCADOPAGO_CONFIG'));

function getPaymentLink(order, complete) {
    mercadopago.preferences.create({
        items: [
            {
                title: OrderUtils.getName(order),
                picture_url: order.Product.image,
                quantity: 1,
                currency_id: "ARS",
                unit_price: OrderUtils.getElectronicPaymentPrice(order)
            },
        ],
        shipments: {
            mode: 'me2',
            local_pickup: true,
            dimensions: '20x5x15,200'
        },
        back_urls: {
            success: `${config.get('HOST_URL')}/order/completed`,
            pending: `${config.get('HOST_URL')}/order/pending`,
            failure: `${config.get('HOST_URL')}/detail/${order.hash}`
        },
        expires: true,
        expiration_date_to: getExpirationTime(),
        notification_url: `${config.get('HOST_URL')}/mercadopago/payment_notification`
    }).then(function (mpResponse) {
        savePreference(mpResponse, order)
        complete(mpResponse.response.init_point);
    }).catch(function (mpError) {
        console.log(mpError)
        complete(`${config.get('HOST_URL')}/detail/${order.hash}`)
    });
}

function savePreference(mpResponse, order) {
    var mercadoPagoPreference = db.MercadoPagoPreference.build({ 
        preferenceId: mpResponse.response.id,
        preferenceUrl: mpResponse.response.init_point,
        preferenceCreationDate: new Date(mpResponse.body.date_created),
        status: 'payment_required'
    });
    mercadoPagoPreference.save().then(persistedPreference => {
        persistedPreference.setOrder(order)
    });
}

module.exports = {
    getPaymentLink: getPaymentLink,
    mercadoPagoObject: mercadopago
}

function getExpirationTime() {
    return new Date().addDays(1).toISOString().replace('Z', '-03:00')
}
const APIResponse = require('@appSrc/utils/apiResponse');
const db = global.db;
const logger = require('@localModules/logger/Logger.js');
const MercadoPagoUtils = require('@appSrc/utils/mercadopagoUtils');
const prefix = '/mercadopago';

global.server.app.post(prefix + '/payment_notification', function (req, res) {
    if (req.body && req.body.type == 'payment') {
        logger.debug("Payment received through webhook")
        getAndUpdateMercadoPagoPaymentStatus(req);
    }
    res.send(APIResponse.ok());
    res.end();
});

function getAndUpdateMercadoPagoPaymentStatus(req, callback) {
    logger.debug("About to get payment, merchant_order and preference ids")
    let paymentId = req.body.data.id;
    MercadoPagoUtils.mercadoPagoObject.payment.get(paymentId).then(function (payment) {
        let merchantOrderId = payment.body.order.id
        MercadoPagoUtils.mercadoPagoObject.merchant_orders.get(merchantOrderId).then(function (merchantOrder) {
            updateMercadoPagoPreferenceStatus(merchantOrder.body.preference_id, payment.body.status, paymentId, payment.body.date_last_updated)
        });
    })
}

function updateMercadoPagoPreferenceStatus(preferenceId, status, paymentId, paymentDate) {
    logger.debug("Updating local preference registry")
    db.MercadoPagoPreference.findOne({ where: { preferenceId: preferenceId } }).then(preference => {
        if (preference) {
            preference.update({
                status: status,
                paymentId: paymentId,
                paymentDate: new Date(paymentDate)
            })
        }
    });
}
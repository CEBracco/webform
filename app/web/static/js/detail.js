$(document).ready(function () {
    $('.btn-next').click(function () {
        var deliveryMethod = $("input[name='deliveryMethod']:checked").val();
        var paymentMethod = $("input[name='paymentMethod']:checked").val();
        OrderService.setDeliveryAndPayment({ orderId: orderId, deliveryMethod: deliveryMethod, paymentMethod: paymentMethod }, function (res) {
            if (res.ok) {
                window.location.href = res.data.completeUrl;
            }
        })
    });
});

function processDeliveryMethod() {
    if ($("input[name='deliveryMethod']:checked").val() == 'shipping') {
        $("input[name='paymentMethod'][value='mercadopago']").prop("checked", true);
        processPaymentMethod();
        $("input[name='paymentMethod']").prop('disabled', true);
    } else {
        $("input[name='paymentMethod']").prop('disabled', false);
    }
}

function processPaymentMethod() {
    if ($("input[name='paymentMethod']:checked").val() == 'mercadopago') {
        $('.mercadopago-alert').show();
    } else {
        $('.mercadopago-alert').hide();
    }
}
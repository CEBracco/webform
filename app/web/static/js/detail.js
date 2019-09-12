$(document).ready(function () {
    $('.btn-next').click(function () {
        var deliveryMethod = $("input[name='deliveryMethod']:checked").val();
        var paymentMethod = $("input[name='paymentMethod']:checked").val();
        $('.btn-next').addClass('disabled');
        OrderService.setDeliveryAndPayment({ orderId: orderId, deliveryMethod: deliveryMethod, paymentMethod: paymentMethod }, function (res) {
            if (res.ok) {
                window.location.href = res.data.completeUrl;
            }
            setTimeout(function () { 
                $('.btn-next').removeClass('disabled') 
            }, 3000);
        })
    });

    $("input[name='deliveryMethod']").change(function () {
        if ($("input[name='paymentMethod']:checked").length > 0) {
            $('.btn-next').removeClass('disabled');
        } else {
            $('.btn-next').addClass('disabled');
        }
    });

    $("input[name='paymentMethod']").change(function () {
        if ($("input[name='deliveryMethod']:checked").length > 0) {
            $('.btn-next').removeClass('disabled');
        } else {
            $('.btn-next').addClass('disabled');
        }
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
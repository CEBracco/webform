$(document).ready(function () {
    $('.btn-next').click(function () {
        var deliveryMethod = $("input[name='deliveryMethod']:checked").val();
        var deliveryPoint = $("select[name='deliveryPoint']").val();
        var paymentMethod = $("input[name='paymentMethod']:checked").val();
        $('.btn-next').addClass('disabled');
        OrderService.setDeliveryAndPayment({ orderId: orderId, deliveryMethod: deliveryMethod, paymentMethod: paymentMethod, deliveryPoint: deliveryPoint }, function (res) {
            if (res.ok) {
                window.location.href = res.data.completeUrl;
            }
            setTimeout(function () { 
                $('.btn-next').removeClass('disabled') 
            }, 3000);
        })
    });

    $("input[name='deliveryMethod']").change(function () {
        processDeliveryPoint()
        if ($("input[name='paymentMethod']:checked").length > 0 && isValidDeliveryPoint()) {
            $('.btn-next').removeClass('disabled');
        } else {
            $('.btn-next').addClass('disabled');
        }
    });

    $("input[name='paymentMethod']").change(function () {
        if ($("input[name='deliveryMethod']:checked").length > 0 && isValidDeliveryPoint()) {
            $('.btn-next').removeClass('disabled');
        } else {
            $('.btn-next').addClass('disabled');
        }
    });

    $("select[name='deliveryPoint']").change(function(){
        if ($("input[name='paymentMethod']:checked").length > 0 && $("input[name='deliveryMethod']:checked").length > 0 && isValidDeliveryPoint()) {
            $('.btn-next').removeClass('disabled');
        } else {
            $('.btn-next').addClass('disabled');
        }
    });

    $('select').formSelect();

    init();
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

function processDeliveryPoint() {
    if ($("input[name='deliveryMethod']:checked").val() == "deliveryPoint") {
        $(".deliveryPoint").show();
    } else {
        $(".deliveryPoint").hide();
    }
}

function isValidDeliveryPoint() {
    if ($("input[name='deliveryMethod']:checked").val() == "deliveryPoint") {
        return $("select[name='deliveryPoint']").val() && $("select[name='deliveryPoint']").val() != ""
    }
    return true
}

function init() {
    processDeliveryPoint()
    if ($("input[name='deliveryMethod']:checked").length > 0 && $("input[name='paymentMethod']:checked").length > 0 && isValidDeliveryPoint()) {
        processPaymentMethod();
        $('.btn-next').removeClass('disabled');
    }
}
$(document).ready(function () {
    $('.btn-next').click(function () {
        var data = getFormData();
        if (validCustomerInfo(data)) {
            OrderService.setCustomerInfo(data, function (res) {
                if (res.ok) {
                    window.location.href = "/detail/" + orderId;
                }
            })
        }
    });

    $('input.validate').keyup(function() {
        if (validCustomerInfo(getFormData())) {
            $('.btn-next').removeClass('disabled');
        } else {
            $('.btn-next').addClass('disabled');
        }
    });
});

function validCustomerInfo(data) {
    return (data.name != null && data.name.trim() != '')
        && (data.surname != null && data.surname.trim() != '')
        && (data.cellphone != null && data.cellphone.trim() != '')
}

function getFormData() {
    return {
        orderId: orderId,
        name: $("input[name='name']").val(),
        surname: $("input[name='surname']").val(),
        cellphone: $("input[name='cellphone']").val(),
        instagramUser: $("input[name='instagramUser']").val()
    }
}
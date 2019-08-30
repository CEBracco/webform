$(document).ready(function () {
    $('.btn-next').click(function () {
        var data = {
            orderId: orderId,
            name: $("input[name='name']").val(),
            surname: $("input[name='surname']").val(),
            cellphone: $("input[name='cellphone']").val(),
            instagramUser: $("input[name='instagramUser']").val()
        }
        if (validCustomerInfo(data)) {
            OrderService.setCustomerInfo(data, function (res) {
                console.log(res);
            })
        } else {
            console.log('lala')
        }
    });
});

function validCustomerInfo(data) {
    return (data.name != null && data.name.trim() != '')
        && (data.surname != null && data.surname.trim() != '')
        && (data.cellphone != null && data.cellphone.trim() != '')
}
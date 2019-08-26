$(document).ready(function () {
    $('.btn-next').click(function () {
        var typographyId = $("input[name='typography']:checked").val();
        var textValue = $('#photoText').val();
        OrderService.setTypography({ orderId: orderId, typographyId: typographyId, textValue: textValue }, function (res) {
            console.log(res);
        })
    });
});
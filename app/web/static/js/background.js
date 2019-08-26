$(document).ready(function () {
    $('.btn-next').click(function () {
        var backgroundId = $("input[name='background']:checked").val();
        OrderService.setBackground({ orderId: orderId, backgroundId: backgroundId }, function (res) {
            console.log(res);
        })
    });
});
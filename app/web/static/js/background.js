$(document).ready(function () {
    $('.btn-next').click(function () {
        var backgroundId = $("input[name='background']:checked").val();
        OrderService.setBackground({ orderId: orderId, backgroundId: backgroundId }, function (res) {
            if (res.ok) {
                window.location.href = "/typography/" + orderId;
            }
        })
    });

    $("input[name='background']").change(function () {
        $('.btn-next').removeClass('disabled');
    });
});
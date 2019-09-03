var skipTextValidation = false;

$(document).ready(function () {
    $('.btn-next').click(function () {
        var typographyId = $("input[name='typography']:checked").val();
        var textValue = $('#photoText').val();
        OrderService.setTypography({ orderId: orderId, typographyId: typographyId, textValue: textValue }, function (res) {
            if (res.ok) {
                window.location.href = "/photo_upload/" + orderId;
            }
        })
    });

    $("input[name='typography']").change(function () {
        skipTextValidation = $(this).closest('.selectable-item').hasClass('none');
        if (textIsValid()) {
            $('.btn-next').removeClass('disabled');
        } else {
            $('.btn-next').addClass('disabled');
        }
    });
    $('#photoText').keyup(function() {
        if (textIsValid() && $("input[name='typography']:checked").length > 0) {
            $('.btn-next').removeClass('disabled');
        } else {
            $('.btn-next').addClass('disabled');
        }
    })

    $('#photoText').characterCounter();
});

function textIsValid() {
    return ($('#photoText').val() && $('#photoText').val().trim() != '' && $('#photoText').val().length <= 30) || skipTextValidation; 
}
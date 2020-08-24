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
        processIfIsCode($(this).closest('.selectable-item').hasClass('code'))
        if (textIsValid()) {
            $('.btn-next').removeClass('disabled');
        } else {
            $('.btn-next').addClass('disabled');
        }
    });
    $('#photoText').keyup(function() {
        skipTextValidation = $("input[name='typography']:checked").closest('.selectable-item').hasClass('none');
        if (textIsValid() && $("input[name='typography']:checked").length > 0) {
            $('.btn-next').removeClass('disabled');
        } else {
            $('.btn-next').addClass('disabled');
        }
    })

    $('#photoText').characterCounter();
});

function textIsValid() {
    return ($('#photoText').val() && $('#photoText').val().trim() != '' && $('#photoText').val().length <= textLength) || skipTextValidation; 
}

function processIfIsCode(isCode) {
    var newtextLength = 30;
    if(isCode) {
        newtextLength = 240;
        $('.code-message').removeClass('hide');
        $('.text-message').addClass('hide');
    } else {
        $('.text-message').removeClass('hide');
        $('.code-message').addClass('hide');
    }
    if (textLength != newtextLength) {
        textLength = newtextLength;
        $('#photoText').attr('data-length', textLength);
        $('#photoText').attr('maxlength', textLength);
        $('#photoText').characterCounter();
    }
}
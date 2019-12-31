$(document).ready(function () {
    setPaceOptions();
})

function setPaceOptions() {
    var interval = setInterval(function () {
        if (window.Pace) {
            Pace.options.ajax.trackMethods = ['GET', 'POST'];
            Pace.options.ajax.trackWebSockets = false;
            clearInterval(interval)
        }
    }, 2000);
}

$(document).ready(function() {
    $('.selectable-item .image-container').click(function() {
        var selectableItem = $(this).closest('.selectable-item').find("input[type='radio']");
        if (!selectableItem.prop("checked")) {
            selectableItem.prop("checked", true).trigger('change')
        }
    });

    $(".selectable-item input[type='radio']").change(function() {
        $('.selectable-item .card').removeClass('selected');
        $(this).closest('.selectable-item').find(".card").addClass('selected');
    });

    setSelectableItemsHeight();
});

$(window).resize(function () {
    setSelectableItemsHeight();
});

function setSelectableItemsHeight() {
    if($(".selectable-item.fix-height").length > 0) {
        var maxHeight = $(".selectable-item.fix-height").sort(function (a, b) { return b.offsetHeight - a.offsetHeight })[0].offsetHeight;
        $(".selectable-item.fix-height").height(maxHeight);
    }
}

Date.prototype.formatDateTime = function () {
    return `${paddingTwoZeroNumber(this.getDate())}/${paddingTwoZeroNumber(this.getMonth() + 1)}/${this.getFullYear()} ${paddingTwoZeroNumber(this.getHours())}:${paddingTwoZeroNumber(this.getMinutes())}`
}
function paddingTwoZeroNumber(number) {
    if ((number + '').length == 1) {
        return '0' + number
    }
    return number + ''
}
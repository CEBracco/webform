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
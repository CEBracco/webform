$(document).ready(function() {
    $('.selectable-item .image-container').click(function() {
        var selectableItem = $(this).closest('.selectable-item').find("input[type='radio']");
        if (!selectableItem.prop("checked")) {
            selectableItem.prop("checked", true).trigger('change')
        }
    });

    $(".selectable-item input[type='radio']").change(function() {
        console.log('lala');
        $('.selectable-item .image-container').removeClass('selected');
        $(this).closest('.selectable-item').find(".image-container").addClass('selected');
    });
})

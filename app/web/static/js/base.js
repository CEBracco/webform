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

$(document).ready(function(){
    $('[class*="animated-infinite-"]').each(function () {
        var matchedClass = getMatchClass(this.className, /animated-infinite/);
        var animatedClasses = matchedClass.replace(/infinite-/g,'').split('-');
        var delay = getDelay(animatedClasses[animatedClasses.length - 1]);
        repeatAnimation(this, animatedClasses.join(' '), delay);
        $(this).removeClass(matchedClass).addClass(animatedClasses.join(' '));
    });
})

function getMatchClass(className, match){
    var classes = className.split(' ');
    var matchedClass = null;
    classes.forEach(clazz => {
        if (match.test(clazz)) {
            matchedClass =  clazz;
            return clazz;
        }
    });
    return matchedClass;
}

function repeatAnimation(element, animatedClasses, delay){
    $(element).one('animationend', function () {
        $(element).removeClass(animatedClasses);
        setTimeout(function () {
            $(element).addClass(animatedClasses);
            repeatAnimation(element, animatedClasses, delay)
        }, delay);
    });
}

function getDelay(clazz) {
    return parseInt(clazz.replace(/\D/g, '')) * 1000;
}
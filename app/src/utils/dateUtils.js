Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.formatDateTime = function () {
    return `${paddingTwoZeroNumber(this.getDate())}/${paddingTwoZeroNumber(this.getMonth() + 1)}/${this.getFullYear()} ${paddingTwoZeroNumber(this.getHours())}:${paddingTwoZeroNumber(this.getMinutes())}`
}

function paddingTwoZeroNumber(number) {
    if((number + '').length == 1){
        return '0' + number
    }
    return number + ''
}
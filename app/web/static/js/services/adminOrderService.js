var AdminOrderService = {
    setStatus: function (data, success) {
        $.ajax({
            url: '/order/setStatus',
            contentType: 'application/json',
            data: JSON.stringify(data),
            type: 'POST'
        }).done(success);
    },
    list: function (data, success) {
        $.ajax({
            url: '/order/list',
            contentType: 'application/json',
            data: JSON.stringify(data),
            type: 'POST'
        }).done(success);
    }
}
var OrderService = {
    create: function (data,success) {
        $.ajax({
            url: '/order/create',
            contentType: 'application/json',
            data: JSON.stringify(data),
            type: 'POST'
        }).done(success);
    },
    setTypography: function (data, success) {
        $.ajax({
            url: '/order/setTypography',
            contentType: 'application/json',
            data: JSON.stringify(data),
            type: 'POST'
        }).done(success);
    },
    setBackground: function (data, success) {
        $.ajax({
            url: '/order/setBackground',
            contentType: 'application/json',
            data: JSON.stringify(data),
            type: 'POST'
        }).done(success);
    }
}
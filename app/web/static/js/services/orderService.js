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
    },
    setCustomerInfo: function (data, success) {
        $.ajax({
            url: '/order/setCustomerInfo',
            contentType: 'application/json',
            data: JSON.stringify(data),
            type: 'POST'
        }).done(success);
    },
    deletePhoto: function (data, success) {
        $.ajax({
            url: `/photos/${data.orderId}/${data.filename}`,
            contentType: 'application/json',
            data: '',
            type: 'DELETE'
        }).done(success);
    },
    setDeliveryAndPayment: function (data, success) {
        $.ajax({
            url: '/order/setDeliveryAndPayment',
            contentType: 'application/json',
            data: JSON.stringify(data),
            type: 'POST'
        }).done(success);
    }
}
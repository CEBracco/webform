var AdminProductService = {
    list: function (data, success) {
        $.ajax({
            url: '/product/list',
            contentType: 'application/json',
            data: JSON.stringify(data),
            type: 'POST'
        }).done(success);
    },
    createOrEdit: function (data, success) {
        $.ajax({
            url: '/product/createOrEdit',
            contentType: 'application/json',
            data: JSON.stringify(data),
            type: 'POST'
        }).done(success);
    },
    get: function (data, success) {
        $.ajax({
            url: '/product/get',
            contentType: 'application/json',
            data: JSON.stringify(data),
            type: 'POST'
        }).done(success);
    },
    setEnabled: function (data, success) {
        $.ajax({
            url: '/product/setEnabled',
            contentType: 'application/json',
            data: JSON.stringify(data),
            type: 'POST'
        }).done(success);
    },
    delete: function (data, success) {
        $.ajax({
            url: '/product/delete',
            contentType: 'application/json',
            data: JSON.stringify(data),
            type: 'POST'
        }).done(success);
    },
    uploadPhoto: function (productId, data, success) {
        $.ajax({
            type: 'POST',
            data: data,
            url: `/product/photo_upload/${checkoutToken}/${productId}`,
            cache: false,
            contentType: false,
            processData: false
        }).done(success);
    }
}
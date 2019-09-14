var PhotoService = {
    process: function (data,success) {
        $.ajax({
            url: `/photo_upload/${data.orderId}/${data.filename}/process`,
            contentType: 'application/json',
            data: '',
            type: 'POST'
        }).done(success);
    },
    thumbnail: function (data, success) {
        $.ajax({
            url: `/photos/${data.orderId}/${data.filename}/generateThumbnail`,
            contentType: 'application/json',
            data: JSON.stringify(data),
            type: 'POST'
        }).done(success);
    },
    delete: function (data, success) {
        $.ajax({
            url: `/photos/${data.orderId}/${data.filename}`,
            contentType: 'application/json',
            data: '',
            type: 'DELETE'
        }).done(success);
    }
}
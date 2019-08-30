$(document).ready(function(){
    $(".file-uploader").dropzone({ 
        url: orderId + "/upload",
        acceptedFiles: "image/*",
        parallelUploads: 50,
        paramName: "photo",
        autoProcessQueue: false,
        clickable: ".upload-button",
        previewsContainer: ".file-list",
        previewTemplate: `
            <li class="collection-item avatar">
                <img class="circle" data-dz-thumbnail>
                <span class="title"><span data-dz-name></span></span>
                <p class="details" data-dz-size></p>
                <a href="#!" class="secondary-content" data-dz-remove><i class="material-icons">clear</i></a>
            </li>
        `,
        dragover: function(){
            $(".file-uploader").addClass("dragging");
        },
        dragleave: function(){
            $(".file-uploader").removeClass("dragging");
        },
        drop: function(){
            $(".file-uploader").removeClass("dragging");
        },
        init: function () {
            this.on("addedfile", function () {
                $('.empty-files-alert').fadeOut();
                $('.file-list-container').fadeIn();
            });
            this.on("reset", function () {
                $('.file-list-container').fadeOut();
                $('.empty-files-alert').fadeIn();
            });
            this.on("queuecomplete", function(){
                window.location.href = `/customer_info/${orderId}`;
            });
            this.on("processing", function(a){
                console.log(a);
            });
            this.on("totaluploadprogress",function(progress){
                $(".file-uploader .progress").show();
                $(".file-uploader .progress .determinate").css("width",`${progress}%`);
            })
        }
    });

    $('.clear-button').click(function(){
        $(".file-uploader")[0].dropzone.removeAllFiles(true);
        $(".collection-item.saved").each(function() {
            deletePhoto($(this));
        })
    });

    $('.confirm-upload').click(function(){
        $(".file-uploader")[0].dropzone.processQueue();
    });
});

function onDeletePhotoButton(button) {
    deletePhoto($(button).closest('.collection-item'));
}

function deletePhoto(element) {
    OrderService.deletePhoto({ orderId: orderId, filename: element.data("photo") }, function (){
        element.remove();
        if ($('.collection.file-list .collection-item').length == 0) {
            $('.file-list-container').fadeOut();
            $('.empty-files-alert').fadeIn();
        }
    });
}

/* <div class="dz-preview dz-file-preview">
    <div class="dz-details">
        <div class="dz-filename"><span data-dz-name></span></div>
        <div class="dz-size" data-dz-size></div>
        <img data-dz-thumbnail />
    </div>
    <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
    <div class="dz-error-message"><span data-dz-errormessage></span></div>
    <a data-dz-remove>Remove</a>
</div> */
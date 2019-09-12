var uploadInProcess = false;

$(document).ready(function(){
    $(".file-uploader").dropzone({ 
        url: orderId + "/upload",
        acceptedFiles: "image/*",
        maxFilesize: 100,
        parallelUploads: 1,
        chunking: true,
        forceChunking: true,
        chunkSize: 256000,
        retryChunks: true,
        retryChunksLimit: 3,
        paramName: "photo",
        autoProcessQueue: false,
        clickable: ".upload-button",
        previewsContainer: ".file-list",
        previewTemplate: `
            <li class="collection-item avatar photo-item">
                <img class="circle responsive-img" data-dz-thumbnail>
                <span class="title"><span data-dz-name></span></span>
                <p class="details" data-dz-size></p>
                <a href="#!" class="secondary-content" data-dz-remove><i class="material-icons">clear</i></a>
            </li>
        `,
        renameFile: function(file) {
            return `${Date.now()}-${file.name}`
        },
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
                validateUpload();
            });
            this.on("reset", function () {
                $('.file-list-container').fadeOut();
                $('.empty-files-alert').fadeIn();
                validateUpload();
            });
            this.on("queuecomplete", function(){
                uploadInProcess = false;
                window.location.href = `/customer_info/${orderId}`;
            });
            this.on("complete", function () {
                console.log(a)
                $(".file-uploader")[0].dropzone.processQueue();
            });
            this.on("processing", function(a){
            });
            this.on("complete", function (photo) {
                PhotoService.process({ orderId: orderId, filename: photo.upload.filename }, function () {
                    if ($(".file-uploader")[0].dropzone.getQueuedFiles().length > 0) {
                        $(".file-uploader")[0].dropzone.processQueue();
                    }
                });
            });
            this.on("totaluploadprogress",function(progress){
                $(".file-uploader .progress").show();
                $(".file-uploader .progress .determinate").css("width",`${progress}%`);
            })
            this.on("removedfile", function() {
                $(".file-uploader .progress").hide();
                validateUpload();
            });
        }
    });

    $('.clear-button').click(function(){
        $(".file-uploader")[0].dropzone.removeAllFiles(true);
        $(".collection-item.saved").each(function() {
            deletePhoto($(this));
        })
    });

    $('.confirm-upload').click(function(){
        if ($(".file-uploader")[0].dropzone.getQueuedFiles().length > 0 || uploadInProcess) {
            uploadInProcess = true;
            $(".file-uploader")[0].dropzone.processQueue();
        } else {
            window.location.href = `/customer_info/${orderId}`;
        }
    });

    validateUpload()
});

function onDeletePhotoButton(button) {
    deletePhoto($(button).closest('.collection-item'));
}

function deletePhoto(element) {
    PhotoService.delete({ orderId: orderId, filename: element.data("photo") }, function (){
        element.remove();
        validateUpload();
        if ($('.collection.file-list .collection-item').length == 0) {
            $('.file-list-container').fadeOut();
            $('.empty-files-alert').fadeIn();
        }
    });
}

function validateUpload() {
    var uploadedPhotosCount = $('.photo-item').length
    $('.upload-counter').text(`${uploadedPhotosCount} de ${acceptedPhotos}`);
    if (uploadedPhotosCount != acceptedPhotos){
        $('.upload-counter').addClass('required');
        $('.confirm-upload').addClass('disabled');
        return
    }
    //it's all ok!!! let me leave here
    $('.upload-counter').removeClass('required');
    $('.confirm-upload').removeClass('disabled');
}
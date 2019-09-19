var uploadInProcess = false;
var showingError = false;

$(document).ready(function(){
    $(".file-uploader").dropzone({ 
        url: orderId + "/upload",
        acceptedFiles: "image/*",
        maxFilesize: 100,
        parallelUploads: 1,
        chunking: true,
        forceChunking: true,
        chunkSize: 524288,
        retryChunks: true,
        retryChunksLimit: 10,
        chunksUploaded: function(photo, done) {
            PhotoService.process({ orderId: orderId, filename: photo.upload.filename }, function () {
                done();
            });
        },
        paramName: "photo",
        autoProcessQueue: false,
        clickable: ".upload-button",
        previewsContainer: ".file-list",
        previewTemplate: `
            <li class="collection-item avatar photo-item dz-preview dz-file-preview">
                <img class="circle responsive-img" data-dz-thumbnail>
                <span class="title"><span data-dz-name></span></span>
                <p class="details" data-dz-size></p>
                <a class="secondary-content btn-remove" style="cursor:pointer;" data-dz-remove><i class="material-icons">clear</i></a>
                <div class="ldBar label-center secondary-content" data-preset="circle" data-stroke-trail-width="15" data-stroke="#c17300" data-fill="#c17300" data-fill-background-extrude="8" data-fill-background="#d0d0d0" data-stroke-width="15" style="width:5%;height:auto;min-width: 40px;"></div>
                <div class="secondary-content success-mark" style="cursor:default;display:none;"><i class="material-icons">cloud_done</i></div>
                <div class="secondary-content error-mark" style="cursor:default;display:none;"><i class="material-icons required">error_outline</i></div>
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
                if (uploadInProcess && uploadIsValid()) {
                    uploadInProcess = false;
                    window.location.href = `/customer_info/${orderId}`;
                }
            });
            this.on("processing", function(a){
            });
            this.on("complete", function (photo) {
                if ($(".file-uploader")[0].dropzone.getQueuedFiles().length > 0 && uploadInProcess) {
                    $(".file-uploader")[0].dropzone.processQueue();
                }
            });
            this.on("uploadprogress", function (photo, progress) {
                if (progress < 100) {
                    $('.dz-processing:not(.dz-success) > .ldBar')[0].ldBar.set(progress);
                }
            });
            this.on("success", function (photo) {
                $('.dz-success > .ldBar').last()[0].ldBar.set(100);
                $('.dz-success > .ldBar').last().fadeOut();
                $('.dz-success > .success-mark').last().fadeIn();
            });
            this.on("error", function (photo) {
                if (!uploadInProcess) {
                    $(".file-uploader")[0].dropzone.removeFile(photo)
                } else {
                    $('.dz-error > .ldBar').last().fadeOut();
                    $('.dz-error > .error-mark').last().fadeIn();
                    showError();
                }
            });
            this.on("totaluploadprogress",function(progress){
                $(".file-uploader .progress").show();
                var dropzone = $(".file-uploader")[0].dropzone;
                var progressFiles = 100 - (dropzone.getQueuedFiles().length * 100) / dropzone.files.length
                $(".file-uploader .progress .determinate").css("width", `${progressFiles}%`);
            });
            this.on("removedfile", function() {
                $(".file-uploader .progress").hide();
                validateUpload();
            });
            this.on("thumbnail", function (photo, dataUrl) {
                PhotoService.thumbnail({ orderId: orderId, filename: photo.upload.filename, dataUrl: dataUrl });
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
            enableUploadStatus()
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

function uploadIsValid() {
    var uploadedPhotosCount = $('.photo-item').length
    return uploadedPhotosCount == acceptedPhotos
}

function configureLoadingBars() {
    $('.ldBar').each(function () {
        new ldBar(this);
    });
}

function enableUploadStatus() {
    uploadInProcess = true;
    $('.btn-remove').hide();
    configureLoadingBars();
}

function showError() {
    if (!showingError) {
        showingError = true;
        Snackbar.show({
            text: 'Ups! parece que ocurrió un error al subir las fotos. Controlá tu conexión a internet y recarga la página para intentarlo nuevamente.',
            pos: 'bottom-center',
            actionText: 'Recargar',
            actionTextColor: '#c17300',
            duration: 0,
            onActionClick: function () {
                window.location.reload(true);
            }
        });
    }
}
var selectedProductId;
$(document).ready(function() {
    $('#confirm-modal').modal()
    $('#product-modal').modal({
        onCloseEnd: resetForm
    });
    $('select').formSelect();
    
    $('.btn-add-product').click(function() {
        resetForm()
        openProductModal()
    })

    $('.btn-save-product').click(function () {
        var product = getFormData();
        if (validCustomerInfo(product)) {
            AdminProductService.createOrEdit({ authToken: checkoutToken, product: product }, function (res) {
                if (res.ok) {
                    var productId = res.data.productId
                    if (hasPhotoToUpload()) {
                        saveProductPhoto(productId)
                    } else {
                        listProducts()
                        $('#product-modal').modal('close');
                    }
                }
            })
        }
    });

    init()
})

function appendProduct(product) {
    var rendered = Mustache.render(productTemplate, { 
        product: enhancedProduct(product), 
        checkoutToken: checkoutToken, 
    });
    $('#products-table > tbody:last-child').append(rendered)

    var cellphoneRendered = Mustache.render(cellphoneProductTemplate, { 
        product: enhancedProduct(product), 
        checkoutToken: checkoutToken 
    });
    $('#cellphone-products-list').append(cellphoneRendered)
}

function enhancedProduct(product) {
    return product
}

function listProducts() {
    AdminProductService.list({ authToken: checkoutToken }, function (res) {
        if (res.ok) {
            $('#products-table > tbody').empty();
            $('#cellphone-products-list').empty();
            var products = res.data;
            products.forEach(function (product) {
                appendProduct(product)
            });
        }
    })
}

function openProductModal(product) {
    if (product) {
        $('#product-modal .title').html('Editar Producto');
    } else {
        $('#product-modal .title').html('Agregar Producto');
    }
    $('#product-modal').modal('open');
}

var productTemplate
var cellphoneProductTemplate
function loadProductTemplates() {
    cellphoneProductTemplate = $('#cellphone-product-template').html().replace(/&#47;/g, '/');
    Mustache.parse(cellphoneProductTemplate);
    productTemplate = $('#product-template tbody').html().replace(/&#47;/g, '/');
    Mustache.parse(productTemplate);
}

function init() {
    loadProductTemplates();
    listProducts()
}

function validCustomerInfo(data) {
    return (data.name != null && data.name.trim() != '')
        && (data.price != null && data.price.trim() != '')
        && (data.acceptedPhotos != null && data.acceptedPhotos.trim() != '')
}

function editProduct(productId) {
    AdminProductService.get({ authToken: checkoutToken, productId: productId }, function (res) {
        if (res.ok) {
            var product = res.data;
            setFormData(product)
            openProductModal(product)
        }
    })
}

function getFormData() {
    return {
        id: selectedProductId,
        name: $("input[name='name']").val(),
        price: $("input[name='price']").val(),
        acceptedPhotos: $("input[name='acceptedPhotos']").val(),
        image: $("input[name='image']").val(),
        groupId: $("select[name='category']").val()
    }
}

function setFormData(product) {
    selectedProductId = product.id
    $("input[name='name']").val(product.name);
    $("input[name='price']").val(product.price);
    $("input[name='acceptedPhotos']").val(product.acceptedPhotos);
    $("input[name='image']").val(product.image);
    $("select[name='category']").val(product.GroupId);
    $('select').formSelect();
    
    $(".image-preview").removeClass('hide');
    $(".image-preview").css('background-image', `url("${product.image}")`);
}

function resetForm() {
    setFormData({
        id: null,
        name: '',
        price: '',
        acceptedPhotos: '',
        image: ''
    })
    $(".image-preview").addClass('hide');
    $('input[name^="photo"]').val(''); 
}

function toggleProductActivation(productId, element) {
    AdminProductService.setEnabled({ 
        authToken: checkoutToken, 
        productId: productId, 
        enabled: $(element).is(':checked')
    }, function (res) {
        if (!res.ok) {
            $(element).attr('checked', !$(element).is(':checked'));
        }
    })
}

function deleteProduct(productId) {
    AdminProductService.delete({
        authToken: checkoutToken,
        productId: productId,
    }, function (res) {
        if (res.ok) {
            listProducts()
            $('#confirm-modal').modal('close');
        }
    })
}

function onDeleteProductPressed(productId) {
    $('#confirm-modal').find('.btn-delete-product').attr('onclick', `deleteProduct(${productId})`)
    $('#confirm-modal').modal('open')
}

function saveProductPhoto(productId) {
    var data = new FormData($('.putImages')[0]);
    AdminProductService.uploadPhoto(productId, data, function(res) {
        if(res.ok) {
            listProducts()
            $('#product-modal').modal('close');
        }
    });
}

function hasPhotoToUpload() {
    return $('input[name^="photo"]')[0].files.length > 0;
}

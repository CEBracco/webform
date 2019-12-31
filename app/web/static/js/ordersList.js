$(document).ready(function() {
    $('.dropdown-trigger').dropdown();
    $('.status-dropdown li').click(function(){
        var statusButton = $(this).parents('td').find('.dropdown-trigger');
        var actualStatus = statusButton.data('status');
        var newStatus = $(this).data('status');
        var orderId = $(this).closest('.status-dropdown').attr('id').replace('dropdown-', '');
        AdminOrderService.setStatus({ orderId: orderId, status: newStatus, authToken: checkoutToken }, function() {
            statusButton.data('status', newStatus);
            statusButton.text(translateStatus(newStatus));
            statusButton.removeClass(actualStatus + "-status");
            statusButton.addClass(newStatus + "-status");
        })
    })
})

function translateStatus(key) {
    switch (key) {
        case 'pending':
            return 'Pendiente'
        case 'design':
            return 'Diseño'
        case 'print':
            return 'Impresion'
        case 'packaging':
            return 'Corte y Empaquetado'
        case 'ready':
            return 'Listo para la entrega'
        case 'delivered':
            return 'Entregado'
        default:
            return ''
    }
}
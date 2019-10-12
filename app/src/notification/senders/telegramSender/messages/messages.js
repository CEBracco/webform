var config = require('@localModules/config/Config');

function newOrderNotification(order){
  return `<b>Tenés un nuevo pedido!</b> 🎉

Producto: <i>${order.Product.name}</i>
Fondo: <i>${order.Background.name}</i>
Tipografía: <i>${order.Text.Typography.name}</i>
<b>Total: $${order.Product.price + order.Background.price + order.Text.Typography.price}</b>

Forma de Entrega: <i>${translateDeliveryMethod(order.deliveryMethod)}</i>
Método de pago: <i>${translatePaymentMethod(order.paymentMethod)}</i>

<b>Contacto</b>
${capitalizeFirstLetter(order.name)} ${capitalizeFirstLetter(order.surname)}
${order.cellphone}
${order.instagramUser ? order.instagramUser : ''}

<a href="${config.get("HOST_URL")}/checkout/${config.get("CHECKOUT_TOKEN")}/${order.hash}">👉🏻 Ver detalle...</a>`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function translateDeliveryMethod(key) {
  switch (key) {
    case 'shipping':
      return 'Envío'
    case 'deliveryPoint':
      return 'Punto de Entrega'
    default:
      return ''
  }
}

function translatePaymentMethod(key) {
  switch (key) {
    case 'mercadopago':
      return 'MercadoPago'
    case 'cash':
      return 'Efectivo'
    default:
      return ''
  }
}

module.exports = {
  newOrderNotification: newOrderNotification
}

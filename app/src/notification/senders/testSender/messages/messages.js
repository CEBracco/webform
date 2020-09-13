var config = require('@localModules/config/Config');
var OrderUtils = require('@appSrc/utils/orderUtils');

function newOrderNotification(order){
  return `<b>Tenés un nuevo pedido!</b> 🎉

Producto: <i>${order.Product.name}</i>
Fondo: <i>${order.Background.name}</i>
Tipografía: <i>${order.Text.Typography.name}</i>
<b>Total: $${OrderUtils.getPrice(order)}</b>

Forma de Entrega: <i>${translateDeliveryMethod(order.deliveryMethod, order.deliveryPoint)}</i>
Método de pago: <i>${translatePaymentMethod(order.paymentMethod)}</i>

<b>Contacto</b>
${capitalizeFirstLetter(order.name)} ${capitalizeFirstLetter(order.surname)}
${order.cellphone}
${order.instagramUser ? order.instagramUser : ''}

<b>Domicilio</b>
${OrderUtils.getHumanReadableAddress(order)}

<a href="${config.get("HOST_URL")}/checkout/${config.get("CHECKOUT_TOKEN")}/${order.hash}">👉🏻 Ver detalle...</a>`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function translateDeliveryMethod(key, deliveryPoint) {
  var deliveryPointDetail = (deliveryPoint && deliveryPoint != null) ? ` (${deliveryPoint})` : '';
  switch (key) {
    case 'shipping':
      return 'Envío'
    case 'takeAway':
      return 'Retiro a domicilio'
    case 'deliveryPoint':
      return 'Punto de Entrega' + deliveryPointDetail
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

function labDownloadNotification(downloadLink) {
  return `<b>El laboratorio descargó el pedido!</b> 📸

Ya descargaron el pedido y estan trabajando para imprimir las fotos enviadas, podés ver las fotos descargadas entrando en el siguiente enlace:

<a href="${downloadLink}" >👉🏻 Ver fotos</a>`;
}

module.exports = {
  newOrderNotification: newOrderNotification,
  labDownloadNotification: labDownloadNotification
}

$(document).ready(function() {
   $('.btn-next').click(function() {
       var productId = $("input[name='product']:checked").val();
       OrderService.create({productId:productId, orderId: orderId},function(res) {
           if(res.ok) {
               window.location.href = "/background/" + res.data.orderId;
           }
       })
   });
});
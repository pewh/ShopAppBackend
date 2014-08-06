exports.totalPrice = function( obj ) {
  if( obj.product ) {
    return obj.product.buyPrice * obj.quantity;
  }

  return 0;
};
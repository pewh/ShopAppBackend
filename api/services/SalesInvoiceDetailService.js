exports.totalPrice = function( obj ) {
  if( obj.product ) {
    return obj.product.sellPrice * obj.quantity;
  }

  return 0;
};
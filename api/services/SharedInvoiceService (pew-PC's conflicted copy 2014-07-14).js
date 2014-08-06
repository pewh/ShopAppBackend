exports.sumNumberArray = function( array ) {
    if ( _.isNumber.apply(this, array) ) {
      return _.reduce(array, function (memo, num) {
          return memo + num;
      }, 0);
    }

    return 0;
};

exports.totalQuantities = function( obj ) {
  var pluckedQuantity = _.pluck(obj.details, 'quantity');

  return exports.sumNumberArray(pluckedQuantity);
};

exports.totalPriceBeforeDiscount = function( obj ) {
  var totalPrices = _.pluck(obj.details, 'totalPrice');

  return exports.sumNumberArray(totalPrices);
};

exports.totalPriceAfterDiscount = function( obj ) {
  return obj.totalPriceBeforeDiscount * (1 - obj.discount / 100);
};

// exports.stock = function( obj ) {
//   // console.log(PurchaseInvoiceDetail.find({ product: obj.id }).exec(function( err, detail ) {
//   //   return sumNumberArray(_.pluck(detail, 'quantity'));
//   // }));
//   return PurchaseInvoiceDetail
//     .find({ product: obj.id })
//     .then(function( detail ) {
//       return sumNumberArray(_.pluck(detail, 'quantity'));
//     });
//   // return 0;
// };
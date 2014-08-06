/**
* PurchaseInvoiceDetail.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    invoice: { model: 'purchaseinvoice'},
    product: { model:'product' },
    quantity: { type: 'INTEGER', defaultsTo: 0 },

    toJSON: function() {
      var obj = this.toObject();
      obj.totalPrice = PurchaseInvoiceDetailService.totalPrice(obj);
      
      return obj;
    }
  },

  afterUpdate: function( value, callback ) {
    SharedInvoiceService.updateStock(PurchaseInvoiceDetail, value, callback);
  },

  afterCreate: function( value, callback ) {
    Product.findOne(value.product).then(function( product ) {
      product.stock += value.quantity;
      product.save(callback);
    });
  },

  afterDestroy: function( values, callback ) {
    if (values.length) {
      async.each(values, function(value, eachCallback) {
        Product.findOne(value.product).then(function( product ) {
          product.stock -= value.quantity;
          product.save(eachCallback);
        });
      }, callback);
    } else {
      callback();
    }
  }
};
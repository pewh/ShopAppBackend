/**
* SalesInvoice.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    datetime: { type: 'DATETIME', defaultsTo: new Date() },
    code:     { type: 'STRING', required: true, unique: true },
    discount: { type: 'FLOAT', defaultsTo: 0, min: 0, max: 100 },
    customer: { model:'customer' },
    details:  { collection: 'salesinvoicedetail', via: 'invoice' },

    toJSON: function () {
      var obj = this.toObject();

      obj.totalQuantities = SharedInvoiceService.totalQuantities(obj);
      obj.totalPriceBeforeDiscount = SharedInvoiceService.totalPriceBeforeDiscount(obj);
      obj.totalPriceAfterDiscount = SharedInvoiceService.totalPriceAfterDiscount(obj);

      return obj;
    }
  },

  beforeDestroy: function( value, callback ) {
    SalesInvoiceDetail.destroy({ invoice: value.where.id }).exec(callback);
  }
};
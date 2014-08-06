/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  
  schema: true,

  attributes: {
    code:      { type: 'STRING', unique: true },
    name:      { type: 'STRING' },
    supplier:  { model:'supplier' },
    stock:     { type: 'INTEGER', defaultsTo: 0 },
    buyPrice:  { type: 'INTEGER', min: 1 },
    sellPrice: { type: 'INTEGER', min: 1 }
  },

  afterDestroy: function( value, callback ) {
    PurchaseInvoiceDetail.destroy({ product: value.id }).exec(callback);
  }
};
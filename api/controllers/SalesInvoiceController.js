/**
 * SalesInvoiceController
 *
 * @description :: Server-side logic for managing Salesinvoices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  
  findOne: function(req, res) {

    SalesInvoiceService.get(req.params.id, function (results) {
      res.json(results);
    });

  },

  find: function(req, res) {
    SalesInvoiceService.getAll(function (results) {
      res.json(results);
    });

  } 
};


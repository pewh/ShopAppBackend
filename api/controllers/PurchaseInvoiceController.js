/**
 * PurchaseInvoiceController
 *
 * @description :: Server-side logic for managing Purchaseinvoices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */



module.exports = {

  findOne: function(req, res) {

    PurchaseInvoiceService.get(req.params.id, function (results) {
      res.json(results);
    });

  },

	find: function(req, res) {
    PurchaseInvoiceService.getAll(function (results) {
      res.json(results);
    });

  } 

  // update: function (req, res, next) {
  //   var id = req.param('id');
  //   var criteria = _.merge({}, req.params.all(), req.body);

  //   if (!id) return res.badRequest('No id provided.');

  //   PurchaseInvoice.update(id, criteria, function (err, invoice) {
  //     if (!invoice.length) return res.notFound();
  //     if (err)             return next(err);

  //     // this is not called too
  //     console.log('called before :' + _.pluck(invoice.details, 'quantity'));

  //     for (var x in criteria.details) {
  //       console.log(x, criteria.details[x]);
  //     }

  //     res.json(invoice);
  //   });
  // }

  // update: function (req, res, next) {

  //   var id = req.param('id');
  //   var criteria = _.merge({}, req.params.all(), req.body);

  //   if (!id) return res.badRequest('No id provided.');

  //   PurchaseInvoice.update(id, criteria, function (err, invoice) {
  //     if (!invoice.length) return res.notFound();
  //     if (err)             return next(err);

  //     // this is not called too
  //     // console.log('\ncalled mid :');
  //     // for (var x in invoice) {
  //     //   console.log(x, invoice[x]);
  //     // }

  //     // console.log('\nafter update');

  //     // for (var x in criteria) {
  //     //   console.log(x, criteria[x]);
  //     // }

  //     console.log('called');

  //     res.json(invoice);
  //   });
  // }
};
/**
 * PurchaseInvoiceDetailController
 *
 * @description :: Server-side logic for managing Purchaseinvoicedetails
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  update: function (req, res, next) {

    var id = req.param('id');
    var criteria = _.merge({}, req.params.all(), req.body);

    if (!id) return res.badRequest('No id provided.');

    console.log('before update');

    for (var x in criteria) {
      console.log(x, criteria[x]);
    }

    PurchaseInvoiceDetail.update(id, criteria, function (err, detail) {
      if (!detail.length) return res.notFound();
      if (err)            return next(err);

      // this is not called too
      console.log('called mid :' + detail);
      for (var x in detail) {
        console.log(x, detail[x]);
      }

      console.log('after update');

      for (var x in criteria) {
        console.log(x, criteria[x]);
      }

      res.json(detail);
    });
  }

};


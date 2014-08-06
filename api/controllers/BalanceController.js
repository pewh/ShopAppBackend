/**
 * BalanceController
 *
 * @description :: Server-side logic for managing balances
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res) {

    async.parallel({
      totalDefisit: PurchaseInvoiceService.totalDefisit,
      totalSurplus: SalesInvoiceService.totalSurplus
    }, function( err, results ) {
      res.json(results);
    });

  },
};
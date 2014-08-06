var getProductById = function (config) {
  return _.findWhere(config.product, {
    id: config.id
  });
}

var getInvoice = function (options, callback) {
  var salesInvoice = null;

  if (options.findById) {
    salesInvoice = SalesInvoice.find(options.findById);
  } else {
    salesInvoice = SalesInvoice.find();
  }

  var methods = {
    products: function (callback) {
      Product.find().exec(callback);
    },
    invoices: function (callback) {
      salesInvoice.populate('customer').populate('details').exec(callback);
    }
  };
   

  // ASYNC
  async.auto(methods, function (err, results) {
    var invoices = results.invoices;
    var products = results.products;

    _.forEach(invoices, function (invoice) {
      _.forEach(invoice.details, function (detail) {

        var productID = detail.product;

        detail.product = getProductById({
          product: products,
          id: productID
        });

      })
    })

    var output = results.invoices;

    if (options.findById) {
      output = output[0];
    }

    callback(output);
  });
}


// ---------------------------------------------------------------

exports.getAll = function (callback) {
  getInvoice({}, callback);
}

exports.get = function (id, callback) {
  getInvoice({ findById: id }, callback);
}
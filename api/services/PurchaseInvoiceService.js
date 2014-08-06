/* CONTROLLER */
var getProductById = function (config) {
  return _.findWhere(config.product, {
    id: config.id
  });
}

var getInvoice = function (options, callback) {
  var purchaseInvoice = null;

  if (options.findById) {
    purchaseInvoice = PurchaseInvoice.find(options.findById);
  } else {
    purchaseInvoice = PurchaseInvoice.find();
  }

  var methods = {
    products: function (callback) {
      Product.find().exec(callback);
    },
    invoices: function (callback) {
      purchaseInvoice.populate('supplier').populate('details').exec(callback);
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

exports.getAll = function (callback) {
  getInvoice({}, callback);
}

exports.get = function (id, callback) {
  getInvoice({ findById: id }, callback);
}


// ---------------------------------------------------------------
// REFACTOR LATER
var totalPriceBeforeDiscount = function (obj) {
  var totalPrices = _.map(obj.details, function(detail) {
    if ( detail.product ) {
      return detail.product.buyPrice * detail.quantity;
    }

    return 0;
  });

  return SharedInvoiceService.sumNumberArray(totalPrices);
};

// REFACTOR LATER
var totalPriceAfterDiscount = function (obj) {
  return totalPriceBeforeDiscount(obj) * (1 - obj.discount / 100);
};

// ---------------------------------------------------------------

exports.totalDefisit = function( callback ) {
  getInvoice({}, function( invoices ) {
    var totalPriceInvoiceList = invoices.map(function( invoice ) {
      return totalPriceAfterDiscount(invoice);
    });

    var totalPrice = totalPriceInvoiceList.reduce(function( sum, num ) {
      return sum + num;
    });
    
    callback(null, totalPrice);
  });
};
var expect = require('chai').expect;
var SharedInvoiceService = require('../api/services/SharedInvoiceService.js');

describe('SharedInvoiceService', function() {

	describe('#sumNumberArray', function() {
		it('should throw error if argument is not included', function() {
			expect(4+5).to.equal(9);
			expect(4+5).to.not.equal(9);
		});
	});
	
});
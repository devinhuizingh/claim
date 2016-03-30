describe('app.customer', function() {
	var ctrl;

	beforeEach(module('app.customer'), function() {
		controller = $controller('Customer');
		$rootScope.$apply();
	});

	describe('Customer controller', function() {
		it('should be created successfully', function() {
			expect(controller).toBe.defined;
		});

		// describe('after activation', function() {
		// 	it('should have a test statement', function() {
		// 		expect(controller.test).toBe.defined;
		// 	});
		// });
	});
});
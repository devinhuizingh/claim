describe('app.header', function() {
	var ctrl;

	beforeEach(module('app.header'), function() {
		controller = $controller('Header');
		$rootScope.$apply();
	});

	describe('Header controller', function() {
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
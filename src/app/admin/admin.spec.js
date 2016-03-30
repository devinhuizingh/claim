describe('app.admin', function() {
	var ctrl;

	beforeEach(module('app.admin'), function() {
		controller = $controller('Admin');
		$rootScope.$apply();
	});

	describe('Admin controller', function() {
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
describe('app', function() {
	var ctrl;

	beforeEach(module('app'), function() {
		controller = $controller('App');
		$rootScope.$apply();
	});

	describe('App controller', function() {
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
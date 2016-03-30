describe('app.user', function() {
	var ctrl;

	beforeEach(module('app.user'), function() {
		controller = $controller('User');
		$rootScope.$apply();
	});

	describe('User controller', function() {
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
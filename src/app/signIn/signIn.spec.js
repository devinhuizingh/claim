describe('app.signIn', function() {
	var ctrl;

	beforeEach(module('app.signIn'), function() {
		controller = $controller('SignIn');
		$rootScope.$apply();
	});

	describe('signIn controller', function() {
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
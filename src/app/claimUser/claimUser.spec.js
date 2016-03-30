describe('app.claimUser', function() {
	var ctrl;

	beforeEach(module('app.claimUser'), function() {
		controller = $controller('ClaimUser');
		$rootScope.$apply();
	});

	describe('ClaimUser controller', function() {
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
describe('app.software', function() {
	var ctrl;

	beforeEach(module('app.software'), function() {
		controller = $controller('Software');
		$rootScope.$apply();
	});

	describe('Software controller', function() {
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
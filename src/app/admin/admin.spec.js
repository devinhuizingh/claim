describe('app.admin', function() {
	beforeEach(module('app'));
	var controller, ref;


	beforeEach(inject(function($controller, $firebaseObject, firebase){
		
		controller = $controller('Admin', {$firebaseObject: $firebaseObject, firebase:firebase})

		//var ref = new MockFirebase('https://amber-torch-7846.firebaseio.com/');
		// ref.set({
		// 	entered: {uid: {
		// 		unique:{
		// 			claimType: "fatClaim"
		// 		}
		// 	}}

  			
		// });

	}))

		it('should be created successfully', function() {
			expect(controller).toBe.defined;
			expect(ref).toBe.defined;
		});

		it('should get data from firebase', function() {
			
			expect(controller.authData).toBe.defined;
			console.log(controller.authData)
		});

		
	
});


// describe('app.header', function() { 
// 	beforeEach(module('app'));
// 	var ctrl;

// beforeEach(inject(function($controller, $cookies) {
//     $cookies.putObject('user', {userID: 1234});
//     ctrl = $controller('Header', {$cookies: $cookies});
// }));


// it('should have a user id', function() {
//     expect(ctrl.user).toBe.defined;
//     expect(ctrl.user).toEqual(1234);
// })

// it('should have a dropdown options', function() {
//     expect(ctrl.options).toBe.defined;
//     expect(ctrl.options[0].name).toEqual('Settings');
//     expect(ctrl.options[1].name).toEqual('Logout');
// });
// });

(function() {
    'use strict';

    angular
        .module('app.signIn')
        .controller('SignIn', SignIn);

    SignIn.$inject = ['$firebaseAuth'];

    function SignIn($firebaseAuth) {
        var vm = this;
 
        
        //log out 
        vm.logOut = function() {
            ref.unauth();
        };
        var ref = new Firebase("https://amber-torch-7846.firebaseio.com");
        vm.authObj = $firebaseAuth(ref);
        console.log(vm.authObj);
        console.log(vm.authObj.getAuth);
        
        //create user authObj
        vm.signUp = function() {
            vm.authObj.$createUser ({
                email: vm.user.email,
                password: vm.user.password
                }).then(function(userData){
                    // user created
                    console.log("User " + userData.uid + " created successfully!");
                }).catch(function(error){
                    // error creating user
                });
        };

        vm.authObj.$onAuth(function(authData) {
            vm.authData=authData;
            console.log(authData.uid)
        });

        //sign in authObj
        vm.signIn = function() {
            vm.authObj.$authWithPassword({
                email: vm.user.email,
                password: vm.user.password
            }).catch(function(error) {
                //Authentication error
            });

            vm.authObj.$onAuth(function(authData) {
                if (authData) {
                    

                } else {
                    //user logged out
                }
            });
        }

        vm.switch = true;
        vm.toggle = function() {
            vm.switch = !vm.switch;
        }   	
    }

    
})();
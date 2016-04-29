(function() {
    'use strict';

    angular
        .module('anon.signIn')
        .controller('SignIn', SignIn);

    SignIn.$inject = ['$firebaseAuth', 'Current', '$firebaseObject'];

    function SignIn($firebaseAuth, Current, $firebaseObject) {
        var vm = this;
 
        
        //log out 
        vm.logOut = function() {
            ref.unauth();
        };
        var ref = new Firebase("https://amber-torch-7846.firebaseio.com");
        
        vm.authObj = $firebaseAuth(ref);
        
        
        
        //create user authObj
        vm.signUp = function() {
            vm.authObj.$createUser ({
                email: vm.user.email,
                password: vm.user.password
                }).then(function(userData){
                    vm.success=true;
                    vm.signIn();
                }).catch(function(error){
                    vm.failure=true;
                });
        };

        vm.authObj.$onAuth(function(authData) {
            vm.authData=authData;
        });

        //sign in authObj
        vm.signIn = function() {
            vm.authObj.$authWithPassword({
                email: vm.user.email,
                password: vm.user.password


            }).then(function(userData){
                    


                    vm.success=true;
                    vm.signed = true;
                    Current.updateEmail(vm.user.email);
                                       
                    
                }).catch(function(error) {
                    vm.failure=true;
            });

        }

        vm.switch = true;
        vm.toggle = function() {
            vm.switch = !vm.switch;

            
        } 

        vm.forgot = function() {  
            vm.instructions=true;
            vm.changed=false;
            vm.changedEmail=false;
        }
        vm.forgot2 = function() {
            ref.resetPassword({
                email: vm.user.email
            }, function(error) {
                if (error) {
                    switch (error.code) {
                        case "INVALID_USER":
                            alert("The specified user account does not exist.");
                            break;
                        default:
                            alert("Error resetting password:", error);
                    }
                } else {
                    alert("Password reset email sent successfully!");
                }
            });
        }

        vm.change = function() {
            vm.changed=true;
            vm.changedEmail=false;
            vm.instructions=false;
        }
        vm.change2 = function() {
            ref.changePassword({
                email: vm.user.email,
                oldPassword: vm.user.password,
                newPassword: vm.user.newPassword
            }, function(error) {
                if (error) {
                    switch (error.code) {
                        case "INVALID_PASSWORD":
                            alert("The specified user account password is incorrect.");
                            break;
                        case "INVALID_USER":
                            alert("The specified user account does not exist.");
                            break;
                        default:
                            alert("Error changing password:", error);
                    }
                } else {
                   alert("User password changed successfully!");
                }
            });
        }

        vm.changeEmail = function() {
            vm.changedEmail=true;
            vm.changed=false;
            vm.instructions=false;
        }
        vm.changeEmail2 = function() {
            ref.changeEmail({
                oldEmail: vm.user.email,
                newEmail: vm.user.newEmail,
                password: vm.user.password
            }, function(error) {
                if (error) {
                    switch (error.code) {
                        case "INVALID_PASSWORD":
                            alert("The specified user account password is incorrect.");
                            break;
                        case "INVALID_USER":
                            alert("The specified user account does not exist.");
                            break;
                        default:
                            alert("Error creating user:", error);
                    }
                } else {
                    alert("User email changed successfully!");
                }
            });
        }

    }

    
})();
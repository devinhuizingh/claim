(function() {
	'use strict';

	angular
		.module('app', [

			// Application
			'app.header',
			'app.user',
			'app.customer',
			'app.claimUser',
			'app.admin',

			//anonymous
			'anon.signIn',
			
			// Shared
			'app.services',

			// Components
			'app.directives',

			// Configuration
			'config.router',
			'config.bootstrap'

		]);
})();
(function() {
    'use strict';

    angular.module('app.admin', []);
})();
(function() {
    'use strict';

    angular.module('app.claimUser', []);
})();
(function() {
    'use strict';

    angular.module('app.directives', []);

    // angular.factory("Auth", function($firebaseAuth){
    // 	var ref = new Firebase("https://amber-torch-7846.firebaseio.com");
    // 	return $firebase(ref);
    // });
})();
(function() {
    'use strict';

    angular.module('app.customer', []);
})();
(function() {
    'use strict';

    angular.module('app.header', []);
})();
(function() {
    'use strict';

    angular.module('app.services', [
    	'firebase'
    ]);
})();
(function() {
    'use strict';

    angular.module('anon.signIn', []);
})();
(function() {
    'use strict';

    angular.module('app.user', []);
})();
(function() {
    'use strict';

    angular.module('config.bootstrap', [
        'ui.bootstrap'
    ]);
})();
(function() {
    'use strict';

    angular.module('config.router', [
        'ui.router'
    ]);
})();
(function() {
    'use strict';

    angular
        .module('app', [

            // Application
            'app.header',
            'app.user',
            'app.customer',
            'app.claimUser',
            
            'app.admin',

            //anonymous
            'anon.signIn',
            

            // Shared
            'app.services',

            // Components
            'app.directives',

            // Configuration
            'config.router',
            'config.bootstrap'

        ])
        .controller('App', App)
        .run(Run);

    App.$inject = ['firebase'];

    function App(firebase) {
        var vm = this;
        firebase.init('https://amber-torch-7846.firebaseio.com')
    }

    Run.$inject = ['$rootScope', '$state', 'Current', 'firebase'];

    function Run($rootScope, $state, Current, firebase) {
        $rootScope.$on('$stateChangeError', stateChangeError);
        $rootScope.$on('$stateChangeStart', stateChangeStart);

        function stateChangeError(e, toState, toParams, fromState, fromParams) {
            e.preventDefault();
            //console.log('Generic state change error.');
            $state.go('app.user', null, {notify: false});
        }

        function stateChangeStart(e, toState, toParams, fromState, fromParams) {
              var ref = firebase.ref();
              var authData = ref.getAuth();

                     
            if (toState.data.requireAdmin && !Current.getAdmin()) {
                e.preventDefault();
                $state.go('app.customer');
            };
            
            
              if (toState.data.requireLogin && !authData) {
                e.preventDefault();
                $state.go('anon.signIn');
            };

        }

    }
})();
(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('Admin', Admin);

    Admin.$inject = ['$firebaseObject', 'firebase', '$window'];

    function Admin($firebaseObject, firebase, $window) {
        
        var vm = this;
        //var ref = firebase.ref();
        var ref = new MockFirebase('https://amber-torch-7846.firebaseio.com/');
        //console.log(ref)
        
       var authData = ref.getAuth();
       
        if (authData) {
            vm.signWarn = false;
            
            vm.data = $firebaseObject(ref);

            vm.myData = [];
            
            ref.once("value", function(data) {
                
                vm.data1 = data.val();
                
                angular.forEach(vm.data1.entered, function(userClaimCollection) {
                    
                    angular.forEach(userClaimCollection, function(claim) {
                        

                        vm.myData.push({
                            claimType: claim.claimType,
                            orderNumber: claim.orderNumber,
                            email: vm.data1.users[claim.uid].email,
                            fatResult: claim.fatResult,
                            fatSB: claim.fatSB,
                            specResult: claim.specResult,
                            specSB: claim.specSB
                        });

                        
                        })
                         
                         
                     })

            });
            
        } else {
            vm.signWarn = true;
        }
        
    }

    
})();

  
(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.admin',
                config: {
                    url: '/admin',
                    views: {
                        'content@': {
                            templateUrl: '/views/admin/admin.html',
                            controller: 'Admin',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        requireAdmin:true
                    }
                }
            }
        ];
    }
})();
(function() {
    'use strict';

    angular
        .module('app.claimUser')
        .controller('ClaimUser', ClaimUser);

    ClaimUser.$inject = ['$firebaseObject', 'firebase'];

    function ClaimUser($firebaseObject, firebase) {
        var vm = this;
        var ref = firebase.ref();
        
        var authData = ref.getAuth();
        if (authData) {
          vm.signWarn = false;
          var enteredRef = new Firebase("https://amber-torch-7846.firebaseio.com/entered/"+authData.uid);
        
        vm.data = $firebaseObject(enteredRef);
        } else {
            vm.signWarn = true;
        }
        
        
   }

    
})();
(function() {
    'use strict';

    angular
        .module('app.claimUser')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.claimUser',
                config: {
                    url: '/claimUser',
                    views: {
                        'content@': {
                            templateUrl: '/views/claimUser/claimUser.html',
                            controller: 'ClaimUser',
                            controllerAs: 'vm'
                        }
                    },
                    data: {}
                }
            }
        ];
    }
})();
(function() {
    'use strict';

    angular
        .module('app.customer')
        .controller('Customer', Customer);

    Customer.$inject = ['firebase', '$firebaseObject'];

    function Customer(firebase, $firebaseObject) {
        var vm = this;
        var ref = firebase.ref();
        var usersRef = new Firebase("https://amber-torch-7846.firebaseio.com/users");
        var authData = ref.getAuth();
        if (authData) {
            vm.signWarn = false;
            var usersRefGet = new Firebase("https://amber-torch-7846.firebaseio.com/users/"+authData.uid);
            vm.data = $firebaseObject(usersRefGet);
            usersRef.once("value", function(snapshot) {
                
            });
            vm.email = authData.password.email;
            
        } else {
            vm.signWarn = true;
        }
        
        vm.customerSubmit = function() {
            var customerInfo = usersRef.child(authData.uid);
            customerInfo.set({
                first: vm.first,
                last: vm.last,
                company: vm.company,
                phone: vm.phone,
                email: vm.email,
            });
        }           
    
    }

})();
(function() {
    'use strict';

    angular
        .module('app.customer')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.customer',
                config: {
                    url: '/customer',
                    views: {
                        'content@': {
                            templateUrl: '/views/customer/customer.html',
                            controller: 'Customer',
                            controllerAs: 'vm'
                        }
                    },
                    data: {}
                }
            }
        ];
    }
})();
(function() {
    'use strict';

    angular
        .module('app.header')
        .controller('Header', Header);

    Header.$inject = ['firebase', '$rootScope', '$firebaseObject', "Current"];

    function Header(firebase, $rootScope, $firebaseObject, Current) {
        var vm = this;
        var ref = firebase.ref();

        vm.logOut=logOut;
        changedAuth();
        
        

        $rootScope.$on('current:email', changedAuth);
        

        function logOut(){
        	ref.unauth();
            vm.signed = false;

        }
        
        function changedAuth(ev, email) {
            var authData = ref.getAuth();
            //console.log(authData)
            if (authData) {
                  vm.email = authData.password.email;
                  vm.id= authData.uid;
                  vm.signed = true;
                  var usersRef = new Firebase("https://amber-torch-7846.firebaseio.com/users/"+authData.uid);
                    
                    usersRef.once("value", function(snapshot) {
                        vm.admin=snapshot.val().isAdmin?true:false;

                        Current.updateAdmin(vm.admin);
                        //console.log(Current.getAdmin())
                
                    });
            } 
        }
        
    }
})();
(function() {
    'use strict';

    angular
        .module('app.header')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app',
                config: {
                    url: '',
                    abstract: true,
                    views: {
                        'header@': {
                            templateUrl: '/views/header/header.html',
                            controller: 'Header',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        requireLogin: true
                    }
                }
            }
        ];
    }
})();
(function() { 'use strict';

angular
    .module('app.services')
    .factory('Current', Current);

Current.$inject = ['$rootScope'];

function Current($rootScope) {

    var service = {
        getEmail: getEmail,
        updateEmail: updateEmail,
        getAdmin: getAdmin,
        updateAdmin: updateAdmin
    };

    var email, admin;
    
    function getEmail() {
        return email;
    }

    
    function updateEmail(e) {
        email = e;
        $rootScope.$broadcast('current:email', email);
    }

    function getAdmin() {
        return admin;
    }

    
    function updateAdmin(a) {
        admin = a;
        $rootScope.$broadcast('current:admin', admin);
    }


    return service;

}
})();
(function() { 'use strict';
angular
    .module('app.services')
    .factory('firebase', firebase);

//firebase.$inject = [''];

function firebase() {
    // The main Firebase declaration, provided here as a service.
    // Really only required if one is an angular purist.

    var _url, _ref;

    return {
        init: init,
        ref: ref
    };

    function init(url) {
        _url = url;
        _ref = new Firebase(_url);
    }

    function ref() {
        return _ref;
    }
}
})();
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
(function() {
    'use strict';

    angular
        .module('anon.signIn')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'anon',
                config: {
                    url: '',
                    abstract: true,
                    views: {
                        'header@': {
                            templateUrl: '/views/header/header.html',
                            controller: 'Header',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        requireLogin: false 
                    }
                }
            },
            {
                state: 'anon.signIn',
                config: {
                    url: '/signIn',
                    views: {
                        'content@': {
                            templateUrl: '/views/signIn/signIn.html',
                            controller: 'SignIn',
                            controllerAs: 'vm'
                        }
                    },
                    //data: {               }
                }
            }
        ];
    }
})();
(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('User', User);

    User.$inject = ['firebase'];

    function User(firebase) {
        var vm = this;

        vm.types = ["Fat Claim", "Specification"];
        
        var ref = firebase.ref();
        var enteredRef = new Firebase("https://amber-torch-7846.firebaseio.com/entered");
        
        vm.signWarn = "not set";
        var authData = ref.getAuth();
        if (authData) {
          vm.signWarn = false;
          
        } else {
            vm.signWarn = true;
        }

        enteredRef.on("value", function(snapshot) {
          }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }); 
        vm.fatSubmit = function() {
            var enteredClaim = enteredRef.child(authData.uid);
            //console.log("submitted")
            enteredClaim.push({ 
                    orderNumber: vm.orderNumber,
                    invoiceNumber: vm.invoiceNumber,
                    poNumber: vm.poNumber,
                    fatResult: vm.fatResult,
                    fatSB: vm.fatSB,
                    difference: vm.fatResult-vm.fatSB,
                    uid: authData.uid,
                    claimType: vm.claimType,
                    email: authData.password.email
                
            });
            alert("claim was submitted, to submit another please refresh your browser");
        } 
        vm.specSubmit = function() {
            var enteredClaim = enteredRef.child(authData.uid);
            //console.log("submitted")
            enteredClaim.push({ 
                    orderNumber: vm.orderNumber,
                    invoiceNumber: vm.invoiceNumber,
                    poNumber: vm.poNumber,
                    specResult: vm.specResult,
                    specSB: vm.specSB,
                    difference: vm.specResult-vm.specSB,
                    uid: authData.uid,
                    claimType: vm.claimType,
                    dollarAmount: vm.specAmount,
                    email: authData.password.email
                
            });
            alert("claim was submitted, to submit another please refresh your browser");
        }             	
    }

    
})();
(function() {
    'use strict';

    angular
        .module('app.user')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.user',
                config: {
                    url: '/',
                    views: {
                        'content@': {
                            templateUrl: '/views/user/user.html',
                            controller: 'User',
                            controllerAs: 'vm'
                        }
                    },
                    data: {}
                }
            }
        ];
    }
})();
(function() {
    'use strict';

    angular
        .module('config.router')
        .provider('routeHelper', routeHelperProvider);

    routeHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    function routeHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {

        this.$get = RouterHelper;

        $locationProvider.html5Mode(true);

        RouterHelper.$inject = ['$rootScope', '$state'];

        function RouterHelper($rootScope, $state) {
            var hasOtherwise = false;

            var service = {
                configureStates: configureStates,
                getStates: getStates
            };

            return service;

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.when('', otherwisePath).otherwise(otherwisePath);
                }
            }

            function getStates() { return $state.get(); }
        }
    }
})();
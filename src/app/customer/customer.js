(function() {
    'use strict';

    angular
        .module('app.customer')
        .controller('Customer', Customer);

    Customer.$inject = ['firebase', '$firebaseObject'];

    function Customer(firebase, $firebaseObject) {
        var vm = this;
        var ref = firebase.ref();
        var usersRef = new Firebase("https://amber-torch-7846.firebaseio.com/users")
        //console.log(ref)
        
        var authData = ref.getAuth();
        vm.email = authData.password.email;
        //console.log(authData.password.email);
    	var usersRefGet = new Firebase("https://amber-torch-7846.firebaseio.com/users/"+authData.uid);
        vm.data = $firebaseObject(usersRefGet);
        
        console.log(vm.data)

       usersRef.on("value", function(snapshot) {
          }, function (errorObject) {
          //console.log("The read failed: " + errorObject.code);
        }); 
        vm.customerSubmit = function() {
            var customerInfo = usersRef.child(authData.uid);
            //console.log(vm.first);
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
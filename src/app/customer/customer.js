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
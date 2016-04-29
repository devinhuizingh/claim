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
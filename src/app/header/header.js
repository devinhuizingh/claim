(function() {
    'use strict';

    angular
        .module('app.header')
        .controller('Header', Header);

    Header.$inject = ['firebase', '$rootScope'];

    function Header(firebase, $rootScope) {
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
                  vm.admin = authData.isAdmin?true:false;

            } 
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.header')
        .controller('Header', Header);

    Header.$inject = ['firebase'];

    function Header(firebase) {
        var vm = this;
        var ref = firebase.ref();
        vm.logOut = function(){
        	ref.unauth();
            vm.signed = false;

        }
        
    var authData = ref.getAuth();
    if (authData) {
          vm.email = authData.password.email;
          vm.id= authData.uid;
          vm.signed = true;
                    
        } else {
            
    }
    
    
    }
})();
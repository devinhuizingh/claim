(function() {
    'use strict';

    angular
        .module('app.header')
        .controller('Header', Header);

    //Header.$inject = [];

    function Header() {
        var vm = this;
        //var ref = firebase.ref();
        var ref = new Firebase("https://amber-torch-7846.firebaseio.com");
        vm.logOut = function(){
        	ref.unauth();
        }
        
    var authData = ref.getAuth();
    if (authData) {
          vm.email = authData.password.email;
          vm.signed = true;
          
        } else {
            
    }
    
    
    }
})();
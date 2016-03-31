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
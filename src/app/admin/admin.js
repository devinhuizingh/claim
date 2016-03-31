(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('Admin', Admin);

    Admin.$inject = ['$firebaseObject', 'firebase'];

    function Admin($firebaseObject, firebase) {
        var vm = this;
        var ref = firebase.ref();
        var authData = ref.getAuth();
        if (authData) {
            vm.signWarn = false;
          
            vm.data = $firebaseObject(ref);
        } else {
            vm.signWarn = true;
        }
        
    }

    
})();
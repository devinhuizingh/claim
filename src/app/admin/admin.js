(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('Admin', Admin);

    Admin.$inject = ['$firebaseObject', 'firebase'];

    function Admin($firebaseObject, firebase) {
        var vm = this;
        var ref = firebase.ref();
        vm.data = $firebaseObject(ref);
        var authData = ref.getAuth();
        
        console.log(vm.data)
        //console.log("Authenticated user with uid:", authData.uid, "https://amber-torch-7846.firebaseio.com/entered/"+authData.uid);
       
                
        
        if (authData) {
          //console.log("Authenticated user with uid:", authData.uid);
          
        }

        //console.log(authData)
       
    }

    
})();
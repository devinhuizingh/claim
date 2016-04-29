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

  
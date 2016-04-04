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

            vm.myData = [];
            
            ref.once("value", function(data) {
                //console.log(data.val());
                vm.data1 = data.val();
                // console.log(vm.data1.entered);
                angular.forEach(vm.data1.entered, function(userClaimCollection) {
                    
                    angular.forEach(userClaimCollection, function(claim) {
                        //console.log(claim.uid);
                        //console.log(vm.data1.users[claim.uid].email)
                        //vm.email1 = vm.data1.users[claim.uid].email;

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
                         
                         //console.log(firstValue);
                          
                          //console.log(vm.data1.users[vm.data1.entered['4ece90fd-0da4-492b-b50d-8c4ec8cb2ba3']])
                          //console.log(claim.email1)
                     })
console.log(vm.myData);
            });
            
        } else {
            vm.signWarn = true;
        }
        
    }

    
})();

    // if (authData) {
    //             vm.signWarn = false;
    //             ref.on('value', function(dataSnapshot) {
    //                  vm.data = dataSnapshot;// handle read data.
    //                  angular.forEach(vm.data.entered, function(claim) {
    //                      claim.email1 = vm.data.users[claim.uid].email;
    //                  })
    //                 });
    //             vm.data = $firebaseObject(ref);

                
    //         } else {
    //             vm.signWarn = true;
    //         }
        
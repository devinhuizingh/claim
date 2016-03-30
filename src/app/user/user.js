(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('User', User);

    User.$inject = ['firebase'];

    function User(firebase) {
        var vm = this;

        vm.types = ["Fat Claim", "Specification", "Foreign Object"];
        
        var ref = firebase.ref();
        var enteredRef = new Firebase("https://amber-torch-7846.firebaseio.com/entered")
        
        var authData = ref.getAuth();

        

        enteredRef.on("value", function(snapshot) {
          }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }); 
        vm.fatSubmit = function() {
            var enteredClaim = enteredRef.child(authData.uid);
            //console.log("submitted")
            enteredClaim.push({ 
                    orderNumber: vm.orderNumber,
                    invoiceNumber: vm.invoiceNumber,
                    poNumber: vm.poNumber,
                    fatResult: vm.fatResult,
                    fatSB: vm.fatSB,
                    difference: vm.fatResult-vm.fatSB,
                    uid: authData.uid,
                    claimType: vm.claimType
                
            });
        } 
        vm.specSubmit = function() {
            var enteredClaim = enteredRef.child(authData.uid);
            //console.log("submitted")
            enteredClaim.push({ 
                    orderNumber: vm.orderNumber,
                    invoiceNumber: vm.invoiceNumber,
                    poNumber: vm.poNumber,
                    specResult: vm.specResult,
                    specSB: vm.specSB,
                    difference: vm.specResult-vm.specSB,
                    uid: authData.uid,
                    claimType: vm.claimType,
                    dollarAmount: vm.specAmount 
                
            });
        }             	
    }

    
})();
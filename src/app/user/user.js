(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('User', User);

    User.$inject = ['firebase'];

    function User(firebase) {
        var vm = this;

        vm.types = ["Fat Claim", "Specification"];
        
        var ref = firebase.ref();
        var enteredRef = new Firebase("https://amber-torch-7846.firebaseio.com/entered");
        
        vm.signWarn = "not set";
        var authData = ref.getAuth();
        if (authData) {
          vm.signWarn = false;
          
        } else {
            vm.signWarn = true;
        }

        
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
                    claimType: vm.claimType,
                    email: authData.password.email
                
            });
            alert("claim was submitted, to submit another please refresh your browser");
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
                    dollarAmount: vm.specAmount,
                    email: authData.password.email
                
            });
            alert("claim was submitted, to submit another please refresh your browser");
        }             	
    }

    
})();
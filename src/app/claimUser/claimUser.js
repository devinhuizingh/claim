(function() {
    'use strict';

    angular
        .module('app.claimUser')
        .controller('ClaimUser', ClaimUser);

    ClaimUser.$inject = ['$firebaseObject', 'firebase'];

    function ClaimUser($firebaseObject, firebase) {
        var vm = this;
        var ref = firebase.ref();
        //vm.data = $firebaseObject(ref);
        var authData = ref.getAuth();
        var enteredRef = new Firebase("https://amber-torch-7846.firebaseio.com/entered/"+authData.uid);


        function extend(base) {
            var parts = Array.prototype.slice.call(arguments, 1);
            parts.forEach(function (p) {
                if (p && typeof (p) === 'object') {
                    for (var k in p) {
                        if (p.hasOwnProperty(k)) {
                            base[k] = p[k];
                        }
                    }
                }
            });
            return base;
        }

        vm.data = $firebaseObject(enteredRef);
        //console.log("Authenticated user with uid:", authData.uid, "https://amber-torch-7846.firebaseio.com/entered/"+authData.uid);
       
        var fb = new Firebase("https://amber-torch-7846.firebaseio.com");
        fb.child('entered/'+authData.uid).once('value', function(enteredSnap) {
            fb.child('users/'+authData.uid).once('value', function(usersSnap){
                
                console.log( extend({}, enteredSnap.val(), usersSnap.val()) );
                console.log(usersSnap)
            });
        });

        // var fb = new Firebase("https://examples-sql-queries.firebaseio.com/");
        // fb.child('user/123').once('value', function(userSnap) {
        //     fb.child('media/123').once('value', function(mediaSnap) {
        //         console.log( extend({}, userSnap.val(), mediaSnap.val()) );
        //      });
        // });
     
        
        if (authData) {
          //console.log("Authenticated user with uid:", authData.uid);
          
        }

        //console.log(authData)
       
    }

    
})();
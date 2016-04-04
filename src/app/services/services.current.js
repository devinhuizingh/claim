(function() { 'use strict';

angular
    .module('app.services')
    .factory('Current', Current);

Current.$inject = ['$rootScope'];

function Current($rootScope) {

    var service = {
        getEmail: getEmail,
        updateEmail: updateEmail
    };

    var email;
    
    function getEmail() {
        return email;
    }

    
    function updateEmail(e) {
        email = e;
        $rootScope.$broadcast('current:email', email);
    }


    return service;

}
})();
(function() { 'use strict';

angular
    .module('app.services')
    .factory('Current', Current);

Current.$inject = ['$rootScope'];

function Current($rootScope) {

    var service = {
        getEmail: getEmail,
        updateEmail: updateEmail,
        getAdmin: getAdmin,
        updateAdmin: updateAdmin
    };

    var email, admin;
    
    function getEmail() {
        return email;
    }

    
    function updateEmail(e) {
        email = e;
        $rootScope.$broadcast('current:email', email);
    }

    function getAdmin() {
        return admin;
    }

    
    function updateAdmin(a) {
        admin = a;
        $rootScope.$broadcast('current:admin', admin);
    }


    return service;

}
})();
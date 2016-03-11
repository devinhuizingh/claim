(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$resource'];

    function AuthService($resource) {
        return $resource('/api/v1/auth/:endpoint', {}, {
            csrf: {method: 'GET', params: {endpoint: 'csrf'}},
            login: {method: 'POST', params: {endpoint: 'login'}},
            logout: {method: 'GET', params: {endpoint: 'logout'}},
            reset: {method: 'POST', params: {endpoint: 'reset'}},
            status: {method: 'GET', params: {endpoint: 'status'}}
        });
    }
})();
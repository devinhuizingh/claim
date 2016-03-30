(function() {
    'use strict';

    angular
        .module('app.customer')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.customer',
                config: {
                    url: '/customer',
                    views: {
                        'content@': {
                            templateUrl: '/views/customer/customer.html',
                            controller: 'Customer',
                            controllerAs: 'vm'
                        }
                    },
                    data: {}
                }
            }
        ];
    }
})();
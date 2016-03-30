(function() {
    'use strict';

    angular
        .module('app.user')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.user',
                config: {
                    url: '/',
                    views: {
                        'content@': {
                            templateUrl: '/views/user/user.html',
                            controller: 'User',
                            controllerAs: 'vm'
                        }
                    },
                    data: {}
                }
            }
        ];
    }
})();
(function() {
    'use strict';

    angular
        .module('app.signIn')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.signIn',
                config: {
                    url: '/signIn',
                    views: {
                        'content@': {
                            templateUrl: '/views/signIn/signIn.html',
                            controller: 'SignIn',
                            controllerAs: 'vm'
                        }
                    },
                    data: {}
                }
            }
        ];
    }
})();
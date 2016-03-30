(function() {
    'use strict';

    angular
        .module('app.claimUser')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.claimUser',
                config: {
                    url: '/claimUser',
                    views: {
                        'content@': {
                            templateUrl: '/views/claimUser/claimUser.html',
                            controller: 'ClaimUser',
                            controllerAs: 'vm'
                        }
                    },
                    data: {}
                }
            }
        ];
    }
})();
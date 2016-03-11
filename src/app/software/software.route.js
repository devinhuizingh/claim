(function() {
    'use strict';

    angular
        .module('app.software')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.software',
                config: {
                    url: '/',
                    views: {
                        'content@': {
                            templateUrl: '/views/software/software.html',
                            controller: 'Software',
                            controllerAs: 'vm'
                        }
                    },
                    data: {}
                }
            }
        ];
    }
})();
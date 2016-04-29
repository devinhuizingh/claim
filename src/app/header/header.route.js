(function() {
    'use strict';

    angular
        .module('app.header')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app',
                config: {
                    url: '',
                    abstract: true,
                    views: {
                        'header@': {
                            templateUrl: '/views/header/header.html',
                            controller: 'Header',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        requireLogin: true
                    }
                }
            }
        ];
    }
})();
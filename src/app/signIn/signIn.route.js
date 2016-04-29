(function() {
    'use strict';

    angular
        .module('anon.signIn')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'anon',
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
                        requireLogin: false 
                    }
                }
            },
            {
                state: 'anon.signIn',
                config: {
                    url: '/signIn',
                    views: {
                        'content@': {
                            templateUrl: '/views/signIn/signIn.html',
                            controller: 'SignIn',
                            controllerAs: 'vm'
                        }
                    },
                    //data: {               }
                }
            }
        ];
    }
})();
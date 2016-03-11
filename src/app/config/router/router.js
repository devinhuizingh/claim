(function() {
    'use strict';

    angular
        .module('config.router')
        .provider('routeHelper', routeHelperProvider);

    routeHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    function routeHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {

        this.$get = RouterHelper;

        $locationProvider.html5Mode(true);

        RouterHelper.$inject = ['$rootScope', '$state'];

        function RouterHelper($rootScope, $state) {
            var hasOtherwise = false;

            var service = {
                configureStates: configureStates,
                getStates: getStates
            };

            return service;

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.when('', otherwisePath).otherwise(otherwisePath);
                }
            }

            function getStates() { return $state.get(); }
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);

    appRun.$inject = ['routeHelper'];

    function appRun(routeHelper) {
        routeHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'app.admin',
                config: {
                    url: '/admin',
                    views: {
                        'content@': {
                            templateUrl: '/views/admin/admin.html',
                            controller: 'Admin',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        requireAdmin:true
                    }
                }
            }
        ];
    }
})();
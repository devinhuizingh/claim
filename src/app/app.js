(function() {
    'use strict';

    angular
        .module('app')
        .controller('App', App)
        .run(Run);

    //App.$inject = [''];

    function App() {
        var vm = this;
    }

    Run.$inject = ['$rootScope', '$state'];

    function Run($rootScope, $state) {
        $rootScope.$on('$stateChangeError', stateChangeError);
        //$rootScope.$on('$stateChangeStart', stateChangeStart);

        function stateChangeError(e, toState, toParams, fromState, fromParams) {
            e.preventDefault();
            console.log('Generic state change error.');
            $state.go('app.software', null, {notify: false});
        }

    }
})();
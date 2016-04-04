(function() {
    'use strict';

    angular
        .module('app')
        .controller('App', App)
        .run(Run);

    App.$inject = ['firebase'];

    function App(firebase) {
        var vm = this;
        firebase.init('https://amber-torch-7846.firebaseio.com')
    }

    Run.$inject = ['$rootScope', '$state'];

    function Run($rootScope, $state) {
        $rootScope.$on('$stateChangeError', stateChangeError);
        $rootScope.$on('$stateChangeStart', stateChangeStart);

        function stateChangeError(e, toState, toParams, fromState, fromParams) {
            e.preventDefault();
            //console.log('Generic state change error.');
            $state.go('app.user', null, {notify: false});
        }

        function stateChangeStart(e, toState, toParams, fromState, fromParams) {
            //console.log(toState)
        }

    }
})();
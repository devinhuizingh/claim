(function() {
    'use strict';

    angular
        .module('app', [

            // Application
            'app.header',
            'app.user',
            'app.customer',
            'app.claimUser',
            
            'app.admin',

            //anonymous
            'anon.signIn',
            

            // Shared
            'app.services',

            // Components
            'app.directives',

            // Configuration
            'config.router',
            'config.bootstrap'

        ])
        .controller('App', App)
        .run(Run);

    App.$inject = ['firebase'];

    function App(firebase) {
        var vm = this;
        firebase.init('https://amber-torch-7846.firebaseio.com')
    }

    Run.$inject = ['$rootScope', '$state', 'Current', 'firebase'];

    function Run($rootScope, $state, Current, firebase) {
        $rootScope.$on('$stateChangeError', stateChangeError);
        $rootScope.$on('$stateChangeStart', stateChangeStart);

        function stateChangeError(e, toState, toParams, fromState, fromParams) {
            e.preventDefault();
            //console.log('Generic state change error.');
            $state.go('app.user', null, {notify: false});
        }

        function stateChangeStart(e, toState, toParams, fromState, fromParams) {
              var ref = firebase.ref();
              var authData = ref.getAuth();

                     
            if (toState.data.requireAdmin && !Current.getAdmin()) {
                e.preventDefault();
                $state.go('app.customer');
            };
            
            
              if (toState.data.requireLogin && !authData) {
                e.preventDefault();
                $state.go('anon.signIn');
            };

        }

    }
})();
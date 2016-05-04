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

		]);
})();
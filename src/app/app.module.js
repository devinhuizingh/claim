(function() {
	'use strict';

	angular
		.module('app', [

			// Application
			'app.header',
			'app.user',
			'app.customer',
			'app.claimUser',
			'app.signIn',
			'app.admin',
			

			// Shared
			'app.services',

			// Components
			'app.directives',

			// Configuration
			'config.router',
			'config.bootstrap'

		]);
})();
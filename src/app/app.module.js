(function() {
	'use strict';

	angular
		.module('app', [

			// Application
			'app.header',
			'app.software',

			// Shared
			'app.services',

			// Components
			'app.directives',

			// Configuration
			'config.router'
		]);
})();
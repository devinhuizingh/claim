(function() { 'use strict';
angular
    .module('app.services')
    .factory('firebase', firebase);

//firebase.$inject = [''];

function firebase() {
    // The main Firebase declaration, provided here as a service.
    // Really only required if one is an angular purist.

    var _url, _ref;

    return {
        init: init,
        ref: ref
    };

    function init(url) {
        _url = url;
        _ref = new Firebase(_url);
    }

    function ref() {
        return _ref;
    }
}
})();
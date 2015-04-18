(function(providerDomain) {
	var handlers = {};

	var addEventListener = function(element, event, handler) {
		if (!element) {
			return;
		}
		if (element.addEventListener) {
			element.addEventListener(event, handler, false);
		} else {
			element.attachEvent(event, handler);
		}
	};

	var onReady = function(handler) {
		addEventListener(document, 'DOMContentLoaded', handler);
		addEventListener(document, 'readystatechange', handler);
	};

	var pkgSelected = function(event) {
		if (event.origin !== providerDomain) {
			return;
		}
		try {
			var pkg = JSON.parse(event.data);
			console.log('Received selected package info: %s', event.data);
			var handler = handlers[pkg.type];
			if (handler) {
				handler(pkg);
			}
		} catch(err) {
			console.log('Error parsing message from %s\n', providerUrl, err);
		}
	};

	onReady(function() {
		addEventListener(window, 'message', pkgSelected);
	});

	window.pm = {};

	window.pm.onPkgSelected = function(type, handler) {
		if (!type) {	
			return;
		}
		handlers[type] = handler;
	};
})('http://localhost:3000');

(function(pm) {
	var addEventListener = function(element, event, action) {
		if (!element) {
			return;
		}
		if (element.addEventListener) {
			element.addEventListener(event, action, false);
		} else {
			element.attachEvent(event, action);
		}
	};

	var openPages = function() {
		var buttonA = document.getElementById('add-a');
		var buttonB = document.getElementById('add-b');

		addEventListener(buttonA, 'click', function() {
			window.open('http://localhost:3000/provider?type=A');
		});

		addEventListener(buttonB, 'click', function() {
			window.open('http://localhost:3000/provider?type=B');
		});
	};

	var loadBaseUrl = function(pkg) {
		console.log('loading pkg: %s', JSON.stringify(pkg));
	};

	addEventListener(document, 'DOMContentLoaded', openPages);
	addEventListener(document, 'readystatechange', openPages);
	
	pm.onPkgSelected('A', loadBaseUrl);
	pm.onPkgSelected('B', loadBaseUrl);
})(window.pm);

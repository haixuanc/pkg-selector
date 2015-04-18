(function(pkgListId) {
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

	// TODO find type in URL query parameter
	var getType = function() {
		return 'A';
	};

	var getPkgInfo = function(id) {
		return {
			type: getType(),
			name: 'some package',
			version: 'v1',
			baseUrl: 'http://www.w3schools.com'
		};
	};

	var forwardSelectedPkg = function() {
		var pkgList = document.getElementById(pkgListId);
		addEventListener(pkgList, 'change', function(event) {	
			console.log('Package with id %s is selected', event.target.value);
			var selectedPkg = getPkgInfo();
			// If page is opened as a pop-up window by window.open()
			var dest = window.opener;
			// else if page is embeded as an iframe
			if (!dest) {
				dest = window.parent;
			}
			if (dest) {
				dest.postMessage(JSON.stringify(selectedPkg), '*');
			}
		});
	};

	onReady(forwardSelectedPkg);
})('pkg-list');

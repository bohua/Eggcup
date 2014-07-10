/**
 * Created by bli on 2014/7/10.
 */

angular.module('print-service', [])
	.factory('printService', function () {

		var Service = {
			print: function (params) {
				var hiddenIFrameID = 'hiddenDownloader',
					iframe = document.getElementById(hiddenIFrameID);
				if (iframe === null) {
					iframe = document.createElement('iframe');
					iframe.id = hiddenIFrameID;
					iframe.style.display = 'none';
					document.body.appendChild(iframe);
				}
				iframe.src = '/printTaskSheet/' + JSON.stringify(params);
			}
		};

		return Service;
	});
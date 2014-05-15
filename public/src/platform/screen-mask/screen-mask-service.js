/**
 * Created by Bli on 2014/5/15.
 */
angular.module('screen-mask-service', [])
	.factory('screenMaskService', function () {
		var mask = $('#screen-mask');

		var Service = {

			show: function () {
				mask.show();
			},

			hide: function () {
				mask.hide();
			}
		}

		return Service;
	});
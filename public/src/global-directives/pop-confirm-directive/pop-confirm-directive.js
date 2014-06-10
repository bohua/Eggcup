/**
 * Created by bli on 2014/6/10.
 */
angular.module('pop-confirm', [])
	.directive('popConfirm', function () {
		var popConfirm = {
			link: function ($scope, $element, $attributes) {
				var options = {
					container: $($element).closest('div'),
					placement: "top"
				};

				var inputOptions = eval("$scope." + $attributes.popConfirm) || {};
				$.extend(true, options, inputOptions);
				$($element).popConfirm(options);
			}
		};

		return popConfirm;
	});
/**
 * Created by Bohua on 2014-06-13.
 */
angular.module('edit-model', [])
	.directive('editModel', ['$timeout', function ($timeout) {
		var editModel = {
			link: function ($scope, $element, $attributes) {
				var model = $attributes.editModel;

				$($element).on('change', function ($event, $value) {
					eval("$scope." + model + "=" + $value);
					$scope.$apply();
				});
			}
		};

		return editModel;
	}]);


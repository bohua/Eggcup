/**
 * Created by Bohua on 2014-06-13.
 */
angular.module('edit-model', [])
	.directive('editModel', ['$timeout', function ($timeout) {
		var editModel = {
			link: function ($scope, $element, $attributes) {
				var model = $attributes.editModel,
					type = $attributes.editType || "string";

				$($element).on('change', function ($event, $value) {
					switch (type) {
						case "string":
						{
							eval("$scope." + model + "='" + $value + "'");
							break;
						}
						case "date":
						{
							eval("$scope." + model + "='" + $value + "'");
							break;
						}
						case "number":
						{
							eval("$scope." + model + "=" + $value);
							break;
						}
					}
					$scope.$apply();
				});
			}
		};

		return editModel;
	}]);


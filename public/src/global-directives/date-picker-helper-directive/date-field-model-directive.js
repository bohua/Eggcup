/**
 * Created by Bli on 2014/5/14.
 */
angular.module('date-field-model', [])
	.directive('dateFieldModel', ['$parse', function ($parse) {
		var Helper = {
			restrict: 'A',
			link: function ($scope, $element, $attributes) {
				var model = eval("$scope." + $attributes.dateFieldModel) || {},
					date = model? new Date(model) : new Date();

				$($element)
					.datepicker({
						format: 'yyyy-mm-dd',
						language: 'zh-CN',
						autoclose: true
					})
					.datepicker('update', date)
					.on('changeDate', function(e){
						eval("$scope." + $attributes.dateFieldModel + "= e.date");
						$scope.$apply();
					});
			}
		}

		return Helper;
	}]);
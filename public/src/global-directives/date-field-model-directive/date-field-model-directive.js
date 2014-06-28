/**
 * Created by Bli on 2014/5/14.
 */
angular.module('date-field-model', [])
	.directive('dateFieldModel', function () {
		var dateFieldModel = {
			restrict: 'A',
			link: function ($scope, $element, $attributes) {
				var model = eval("$scope." + $attributes.dateFieldModel),
					date;

				if (model) {
					date = new Date(model);
				} else {
					model = {};
				}


				$($element)
					.datepicker({
						format: 'yyyy-mm-dd',
						language: 'zh-CN',
						autoclose: true
					})
					.datepicker('update', date)
					.on('changeDate', function (e) {
						date.setFullYear(e.date.getFullYear());
						date.setMonth(e.date.getMonth());
						date.setDate(e.date.getDate());
						eval("$scope." + $attributes.dateFieldModel + "=date");
						$scope.$apply();
					})
					.on('clear', function () {
						$($element).datepicker('update', '');
						eval("$scope." + $attributes.dateFieldModel + "=null");
						$scope.$apply();
					});
			}
		}

		return dateFieldModel;
	});
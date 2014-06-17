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

				if(model){
					date = new Date(model);
				}else{
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
						eval("$scope." + $attributes.dateFieldModel + "= e.date");
						$scope.$apply();
					});
			}
		}

		return dateFieldModel;
	});
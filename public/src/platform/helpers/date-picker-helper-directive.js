/**
 * Created by Bli on 2014/5/14.
 */
angular.module('date-picker-helper', [])
	.directive('datePickerHelper',['$parse', function ($parse) {
		var Helper = {
			restrict: 'A',
			link: function ($scope, $element, $attributes) {

				$($element).datepicker({
					format: "yyyy/mm/dd", // set output format
					effect: "fade", // none, slide, fade
					position: "bottom", // top or bottom
					locale: 'zhCN',
					weekStart: -1,
					selected: function (date) {
						var _calendar = $(this).get(0)._calendar,
							el = $($element).find('input'),
							model = $parse(el.attr('ng-model'));

						_calendar.hide();

						if (model) {
							$scope.$apply(function(){
								model.assign($scope, date);
							});
						}

						el.focus();
					}
				});
			}
		}

		return Helper;
	}]);
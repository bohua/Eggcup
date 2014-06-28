/**
 * Created by Bli on 2014/5/14.
 */
angular.module('time-field-model', [])
	.directive('timeFieldModel', ['$timeout', function ($timeout) {
		var timeFieldModel = {
			restrict: 'A',
			link: {
				post: function ($scope, $element, $attributes) {
					var model = eval("$scope." + $attributes.timeFieldModel),
						date,
						time;

					if (model) {
						date = new Date(model);
						time = (date.getHours() + 1) + ':00';
						date.setHours(date.getHours() + 1);
						date.setMinutes(0);
						eval("$scope." + $attributes.timeFieldModel + "=date");
					} else {
						model = {};
					}

					$timeout(function () {
						$($element)
							.timepicker({
								appendWidgetTo: $($element).closest('#modal-stage'),
								minuteStep: 15,
								showInputs: false,
								template: 'dropdown',
								modalBackdrop: true,
								showMeridian: false,
								defaultTime: time
							})
							.on('changeTime.timepicker', function (e) {
								date.setHours(e.time.hours);
								date.setMinutes(e.time.minutes);
								eval("$scope." + $attributes.timeFieldModel + "=date");
								$scope.$apply();
							})
							.on('clear', function () {
								$($element).datepicker('update', '');
								eval("$scope." + $attributes.timeFieldModel + "=null");
								$scope.$apply();
							});
					});
				}
			}
		}

		return timeFieldModel;
	}]);
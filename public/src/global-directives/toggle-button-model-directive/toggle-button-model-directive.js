/**
 * Created by Bohua on 2014-06-09.
 */
angular.module('toggle-button-model', [])
	.directive('toggleButtonModel', function () {
		var toggleButtonModel = {
			link: function ($scope, $element, $attributes) {
				var ngModel = $attributes.toggleButtonModel,
					model = eval("$scope." + ngModel) || false;

				if(model){
					$($element).button('toggle');
				}

				$($element).on('click',function(){
					eval("$scope." + ngModel + "=!" + $($element).hasClass('active'));
				})
			}
		};

		return toggleButtonModel;
	});
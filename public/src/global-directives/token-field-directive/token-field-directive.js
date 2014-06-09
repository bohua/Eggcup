/**
 * Created by bli on 2014/6/9.
 */
angular.module('token-field', [])
	.directive('tokenField', [ '$timeout', function ($timeout) {
		var tokenField = {
			link: function ($scope, $element, $attributes) {
				var wrapper = $($element).parent();
				$($element).tokenfield({
					autocomplete: {
						source: ['李小帅','苏小美'],
						delay: 100,
						appendTo: wrapper
					},
					showAutocompleteOnFocus: true
				});

				/*
				$('#modal-stage').on('shown.bs.modal',function(e){
					$('.ui-autocomplete').width(wrapper.width());
				});
				*/

			}
		};

		return tokenField;
	}]);
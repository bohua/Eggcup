/**
 * Created by Bohua on 2014-06-10.
 */
angular.module('auto-complete-field', [])
	.directive('autoCompleteField', function () {
		var autoCompleteField = {
			link: function ($scope, $element, $attributes) {
				var wrapper = $($element).closest('div'),
					options = {
					delay: 100,
					appendTo: wrapper,
					minLength: 0
				};

				var inputOption = eval("$scope." + $attributes.autoCompleteField) || {};
				$.extend(true, options, inputOption);

				var handler = $($element).autocomplete(options);
				$($element).on('focus',function(){
					handler.autocomplete( "search", "" );
				})
			}
		};

		return autoCompleteField;
	});
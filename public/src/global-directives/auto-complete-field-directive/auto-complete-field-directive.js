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
						minLength: 0,
						select: function (a, b) {
							eval("$scope." + $attributes.ngModel + "='" + b.item.value + "'");
						}
					};

				var inputOption = eval("$scope." + $attributes.autoCompleteField) || {};
				$.extend(true, options, inputOption);

				var handler = $($element).autocomplete(options);

				$($element).on('focus', function () {
					handler.autocomplete("search", "");
				});

				$($element).on('keydown', function(e){
					var nextEl;
					if(e.keyCode === 9 || e.witch === 9){
						nextEl = $(':input:eq(' + ($(':input').index($(e.currentTarget)) + 1) + ')');
						nextEl.focus();
						e.preventDefault();
						e.stopPropagation();
						return false;
					}
				});
			}
		};

		return autoCompleteField;
	});
/**
 * Created by bli on 2014/6/9.
 */
angular.module('token-field', [])
	.directive('tokenField', function () {
		var tokenField = {
			link: function ($scope, $element, $attributes) {
				var wrapper = $($element).parent();
				var ngModel = $attributes.ngModel,
					tokens = eval("$scope." + ngModel) || [],
					options = {
						autocomplete: {
							delay: 100,
							appendTo: wrapper
						},
						showAutocompleteOnFocus: true,
						tokens: tokens
					};

				var inputOption = eval("$scope." + $attributes.tokenField) || {};
				$.extend(true, options, inputOption);

				$($element).tokenfield(options);

				function updateModel(tokens) {
					var tStr = _.pluck(tokens, 'value').join(',');
					eval("$scope." + ngModel + "='" + tStr + "'");
					$scope.$apply();
				}

				$($element).on('tokenfield:createdtoken', function (e) {
					updateModel($($element).tokenfield('getTokens'));
				}).on('tokenfield:editedtoken', function (e) {
					updateModel($($element).tokenfield('getTokens'));
				}).on('tokenfield:removedtoken', function (e) {
					updateModel($($element).tokenfield('getTokens'));
				});
			}
		};

		return tokenField;
	});
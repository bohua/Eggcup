/**
 * Created by bli on 2014/6/10.
 */
angular.module('pop-confirm', [])
	.directive('popConfirm', function () {
		var popConfirm = {
			link: function ($scope, $element, $attributes) {
				var options, range;
				if ($attributes.popConfirm) {
					options = eval("$scope." + $attributes.popConfirm);
				}

				if (options){
					options.container = options.container || $($element).closest('div');
					options.placement = options.placement || 'top';
				}
				else{
					range = $attributes.clearRange || $($element).closest('.modal-content');
					options = {
						container: $($element).closest('div'),
						placement: "top",

						onConfirm: function () {
							$(range).find(':input').each(function () {
								if (this.hasAttribute('ng-model')) {
									eval("$scope." + this.getAttribute('ng-model') + "=null");
								}

								if (this.hasAttribute('token-field')) {
									$(this).tokenfield('setTokens', []);
								}
							});

							$(range).find('[toggle-button-model]').trigger('clear');
							$(range).find('[date-field-model]').trigger('clear');

							$scope.$apply();
						}
					};
				}

				//var inputOptions = eval("$scope." + $attributes.popConfirm) || {};

				//$.extend(true, options, inputOptions);
				$($element).popConfirm(options);
			}
		};

		return popConfirm;
	});
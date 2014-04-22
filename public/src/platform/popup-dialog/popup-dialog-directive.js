/**
 * Created by Bli on 14-3-6.
 */
angular.module('popup-dialog', [])
	.directive('popupDialog',[ '$compile', function ($compile) {
		var Dialog = {
			restrict: 'E',
			scope: {
				dialogConfig: "=",
				emitConfirm : '&onConfirm',
				emitCancel : '&onCancel'
			},
			link: function ($scope, $element, $attributes) {
				var _onDialogShow = $scope.dialogConfig.onShow,
					template = $scope.dialogConfig.template,
					_sendInModel,
					popupDialog;

				var _onValidateForm = $scope.dialogConfig.onValidateForm || function(){
						return popupDialog.find('.ng-invalid').length === 0;
					};

				if (template) {
					$('<div></div>').load(template, function (response, status, xhr) {
						if (status == "error") {
							return xhr.status + " " + xhr.statusText;
						}

						$($element).on('click', function (event, data_model) {
							$.extend(true, $scope.dialogConfig.dialogOption, {
								content: $compile(response)($scope),
								onShow: _onDialogShow
							});

							popupDialog = $.Dialog($scope.dialogConfig.dialogOption);

							//Initialization of Dialog
							$scope.showErrorMessage = false;

							if(data_model){
								_sendInModel = data_model;
								$scope.dialog_data_model = $.extend(true, {}, data_model);
							}else{
								_sendInModel = null;
								$scope.dialog_data_model = {};
							}
						});
					});
				}

				$scope.Confirm = function(){
					if(_onValidateForm){
						var valid = _onValidateForm();

						if(!valid){
							$scope.showErrorMessage = true;
							return;
						}
					}

					$.Dialog.close();
					$scope.emitConfirm({data: $scope.dialog_data_model});
				};

				$scope.Cancel = function(){
					$.Dialog.close();
					$scope.emitCancel();
				};
			}
		};

		return Dialog;
	}]);
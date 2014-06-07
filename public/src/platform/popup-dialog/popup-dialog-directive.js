/**
 * Created by Bli on 14-3-6.
 */
angular.module('popup-dialog', [])
	.directive('popupDialog',[ '$compile', function ($compile) {
		var Dialog = {
			restrict: 'AE',
			scope: {
				dialogConfig: "=",
				emitConfirm : '&onConfirm',
				emitCancel : '&onCancel'
			},
			link: function ($scope, $element, $attributes) {
				var modalContainter = $('#modal-stage'),
					_onDialogShow = $scope.dialogConfig.onShow,
					template = $scope.dialogConfig.template,
					popupDialog;

				var _onValidateForm = $scope.dialogConfig.onValidateForm || function(){
						return popupDialog.find('.ng-invalid').length === 0;
					};

				function close(){
					modalContainter.modal('hide');
				};

				if (template) {
					$('<div></div>').load(template, function (response, status, xhr) {
						if (status == "error") {
							return xhr.status + " " + xhr.statusText;
						}

						$($element).on('popup', function ($event, mode, dataModel) {
							//Initialization of Dialog
							$scope.prop = {};
							$scope.prop.showErrorMessage = false;
							$scope.prop.mode = mode;

							if(dataModel){
								$scope.dialog_data_model = $.extend(true, {}, dataModel);
							}else{
								$scope.dialog_data_model = {};
							}

							modalContainter.find('.modal-dialog').replaceWith($compile(response)($scope));

							_onDialogShow();

							popupDialog = modalContainter.modal($scope.dialogConfig.dialogOption);
						});
					});
				}

				$scope.Confirm = function(action, validate){
					if(validate && _onValidateForm){
						var valid = _onValidateForm();

						if(!valid){
							$scope.prop.showErrorMessage = true;
							return;
						}
					}

					close();

					$scope.emitConfirm({action: action, data: $scope.dialog_data_model});
				};

				$scope.Cancel = function(){
					close();
					$scope.emitCancel();
				};
			}
		};

		return Dialog;
	}]);
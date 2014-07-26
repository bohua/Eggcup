/**
 * Created by Bohua on 2014-07-26.
 */
angular.module('modal-service', [])
	.factory('modalService', ['$compile', function ($compile) {

		var Service = {
			showDialog: function (scope, dialogConfig, dataModel, extraArgs) {
				var _onDialogShow = dialogConfig.onShow,
					template = dialogConfig.template,
					$scope,
					popupDialog,
					modalContainer;

				var _onValidateForm = dialogConfig.onValidateForm || function () {
					return popupDialog.find('.ng-invalid').length === 0;
				};

				function close() {
					modalContainer.modal('hide');
					if($scope){
						$scope.$destroy();
					}
				};

				if (template) {
					if ($('#modal-stage').length === 0) {
						modalContainer = $('<div id="modal-stage"></div>').appendTo('body');
					} else {
						modalContainer = $('#modal-stage');
					}

					modalContainer.load(template, function (response, status, xhr) {
						if (status == "error") {
							return xhr.status + " " + xhr.statusText;
						}

						var $scope = scope.$new(true);

						//Initialization of Dialog
						$scope.prop = {};
						$scope.prop.showErrorMessage = false;
						//$scope.prop.mode = mode;

						if (dataModel) {
							$scope.dialog_data_model = _.cloneDeep(dataModel);
						} else {
							$scope.dialog_data_model = {};
						}

						if (extraArgs) {
							$scope.extra_args = extraArgs;
						}

						modalContainer.empty().append($compile(response)($scope));

						if (_onDialogShow) {
							$(modalContainer).on('shown.bs.modal', function (e) {
								_onDialogShow(e);
							});
						}

						$scope.Confirm = function (action, validate) {
							if (validate && _onValidateForm) {
								var valid = _onValidateForm();

								if (!valid) {
									$scope.prop.showErrorMessage = true;
									return;
								}
							}

							close();

							if(dialogConfig.onConfirm){
								dialogConfig.onConfirm(action, $scope.dialog_data_model);
							}
						};

						$scope.Cancel = function () {
							close();
							if(dialogConfig.onCancel){
								dialogConfig.onCancel();
							}
						};

						popupDialog = modalContainer.modal(dialogConfig.dialogOption);
						$scope.$apply();
					});
				}
			}
		};

		return Service;
	}]);
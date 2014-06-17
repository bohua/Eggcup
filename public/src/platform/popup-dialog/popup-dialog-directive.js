/**
 * Created by Bli on 14-3-6.
 */
angular.module('popup-dialog', [])
	.directive('popupDialog', [ '$compile', function ($compile) {
		var Dialog = {
			restrict: 'AE',
			scope: {
				dialogConfig: "=",
				emitConfirm: '&onConfirm',
				emitCancel: '&onCancel'
			},
			link: {
				post: function ($scope, $element, $attributes) {
					var _onDialogShow = $scope.dialogConfig.onShow,
						template = $scope.dialogConfig.template,
						popupDialog,
						modalContainer;

					var _onValidateForm = $scope.dialogConfig.onValidateForm || function () {
						return popupDialog.find('.ng-invalid').length === 0;
					};

					function close() {
						modalContainer.modal('hide');
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

							$($element).on('popup', function ($event, mode, dataModel) {
								//Initialization of Dialog
								$scope.prop = {};
								$scope.prop.showErrorMessage = false;
								$scope.prop.mode = mode;

								if (dataModel) {
									//$scope.dialog_data_model = $.extend(true, {}, dataModel);

									$scope.dialog_data_model = _.cloneDeep(dataModel);
								} else {
									$scope.dialog_data_model = {};
								}

								modalContainer.empty().append($compile(response)($scope));

								if (_onDialogShow) {
									$(modalContainer).on('shown.bs.modal', function (e) {
										_onDialogShow(e);
									});
								}


								popupDialog = modalContainer.modal($scope.dialogConfig.dialogOption);
							});
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

						$scope.emitConfirm({action: action, data: $scope.dialog_data_model});
					};

					$scope.Cancel = function () {
						close();
						$scope.emitCancel();
					};
				}
			}
		};

		return Dialog;
	}]);
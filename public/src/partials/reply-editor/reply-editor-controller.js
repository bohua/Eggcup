/**
 * Created by Bohua on 2014-06-18.
 */
angular.module('reply-editor', ['toggle-button-model', 'pop-confirm', 'employee-list-service', 'login-session-service', 'file-type-service'])
	.controller('replyEditorController', [
		'$scope',
		'employeeListService',
		'loginSessionService',
		'fileTypeService',
		function ($scope, employeeListService, loginSessionService, fileTypeService) {

			$scope.employeeFieldOptions = {
				source: _.pluck(employeeListService.getEmployeeList(), 'name')
			};

			$scope.assigneeListOptions = {
				autocomplete: {
					source: _.pluck(employeeListService.getEmployeeList(), 'name')
				}
			};

			var source = [];
			if ($scope.dialog_data_model.customer_contact) {
				source = [$scope.dialog_data_model.customer_contact];
			}
			$scope.customerListOptions = {
				autocomplete: {
					source: source
				}
			};


			$scope.dialog_data_model.consult_context = $scope.dialog_data_model.consult_context || $scope.dialog_data_model.inherit_consult_context;


			/**
			 * Attachment manager
			 */
			$scope.translateFileType = fileTypeService.translateFileType;

			$scope.fileUploaded = function(file){
				$scope.dialog_data_model.attachment.push(file);
				$scope.$apply();
			};

			$scope.tableHandlerOption = {
				hasFileUploader: false,
				hasCreateBtn: false,
				hasOpenBtn: false,
				hasDeleteBtn: true
			};

			if($scope.prop.mode === 'readOnly'){
				$scope.tableHandlerOption.hasDeleteBtn = false;
			}

			/**
			 * Pop confirm option
			 */
			$scope.deleteBtnOptions = {
				onConfirm: function () {
					$scope.Confirm('remove', true);
				}
			};
		}]);

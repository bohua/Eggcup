/**
 * Created by Bohua on 2014-06-18.
 */
angular.module('reply-editor', ['toggle-button-model', 'pop-confirm', 'employee-list-service', 'login-session-service', 'file-type-service', 'print-service'])
	.controller('replyEditorController', [
		'$scope',
		'employeeListService',
		'loginSessionService',
		'fileTypeService',
		'printService',
		function ($scope, employeeListService, loginSessionService, fileTypeService, printService) {

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
				if(!$scope.dialog_data_model.attachment){
					$scope.dialog_data_model.attachment = [];
				}
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

			/**
			 * Print
			 */
			$scope.printDoc = function () {
				var sheetType = $scope.dialog_data_model.handling === 0 ? 'reply_a' : 'reply_b';
				var consultMethods = [],
					privileges = [];

				if ($scope.dialog_data_model.prop_isEmail) consultMethods.push("电子邮件");
				if ($scope.dialog_data_model.prop_isTel) consultMethods.push("电话");
				if ($scope.dialog_data_model.prop_isF2F) consultMethods.push("面谈");
				if ($scope.dialog_data_model.prop_isFax) consultMethods.push("传真");

				if ($scope.dialog_data_model.prop_internal) privileges.push("内部浏览");
				if ($scope.dialog_data_model.prop_external) privileges.push("客户浏览");

				var params = {
					sheetType: sheetType,
					sheetData: {
						singleMapper: {
							customer_name: $scope.dialog_data_model.customer_name,
							customer_contact: $scope.dialog_data_model.customer_contact,
							customer_tel: $scope.dialog_data_model.customer_tel,
							customer_email: $scope.dialog_data_model.customer_email,
							customer_address: $scope.dialog_data_model.customer_address,
							report_date: $scope.dialog_data_model.report_date.split('T')[0],

							reply_date: $scope.dialog_data_model.reply_date.split('T')[0],

							consult_context: $scope.dialog_data_model.consult_context,
							reply_context: $scope.dialog_data_model.reply_context,
							law_context: $scope.dialog_data_model.law_context,
							reply_person: $scope.dialog_data_model.reply_person,
							meeting_address: $scope.dialog_data_model.meeting_address,
							meeting_people_A: $scope.dialog_data_model.meeting_people_A,
							meeting_people_B: $scope.dialog_data_model.meeting_people_B,

							consult_method: consultMethods.join(', '),
							privilege: privileges.join(', ')
						}
					}
				};

				printService.print(params, '打印回复表_TK' + $scope.dialog_data_model.id);
			};

		}]);

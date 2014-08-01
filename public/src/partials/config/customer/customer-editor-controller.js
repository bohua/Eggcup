/**
 * Created by Bli on 2014/4/29.
 */
angular.module('customer-editor', ['employee-list-service'])
	.controller('customerEditorController', ['$scope', 'employeeListService', function($scope, employeeListService){
		/**
		 * Initialize References
		 */
		$scope.employee_list = employeeListService.getEmployeeList();
		if(!$scope.dialog_data_model.contactList){
			$scope.dialog_data_model.contactList= [];
		}

		/**
		 * Initialize Emitters
		 */
		$scope.delete = function(){
			var confirmResult = confirm('确认删除么？');
			if(confirmResult === true){
				$scope.Confirm('remove', false);
			}
		}

		$scope.tableHandlerOption = {
			hasFileUploader: false,
			hasCreateBtn: true,
			hasOpenBtn: false,
			hasDeleteBtn: true,

			defaultRowValue: {
				contact: '新联系人'
			}
		};

		/**
		 * Get system tags
		 */
		//var sysTag = tagReferenceService.getSysTag();
	}]);

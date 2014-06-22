/**
 * Created by Bli on 2014/4/29.
 */
angular.module('register-editor', ['handling-method-service', 'toggle-button-model', 'pop-confirm', 'employee-list-service', 'customer-list-service'])
	.controller('registerEditorController', [
		'$scope',
		'handlingMethodService',
		'employeeListService',
		'customerListService',
		function ($scope, handlingMethodService, employeeListService, customerListService) {
			function applyCustomer(customer_name){
				var find = _.where(customerListService.getCustomerList(), {'name': customer_name});

				$scope.dialog_data_model.customer_name = find[0].name;
				$scope.dialog_data_model.customer_contact = find[0].contact;
				$scope.dialog_data_model.customer_tel = find[0].tel;
				$scope.dialog_data_model.customer_address = find[0].address;
				$scope.dialog_data_model.customer_email = find[0].email;

				$scope.$apply();
			}

			$scope.handlingList = handlingMethodService.getHandlingList();

			$scope.assigneeFieldOptions = {
				autocomplete: {
					source: _.pluck(employeeListService.getEmployeeList(), 'name')
				}
			}

			$scope.customerFieldOptions = {
				source: _.pluck(customerListService.getCustomerList(), 'name'),
				select: function( event, ui ) {
					applyCustomer(ui.item.label);
					$(event.target).blur();
				}
			}
		}]);

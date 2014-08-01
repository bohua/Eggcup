/**
 * Created by bli on 2014/6/9.
 */
angular.module('register-section', ['register-editor', 'handling-method-service', 'print-service'])
	.controller('registerSectionController', [
		'$scope',
		'$http',
		'handlingMethodService',
		'printService',
		function ($scope, $http, handlingMethodService, printService) {
			$scope.registerEditorConfig = {
				dialogOption: {
					backdrop: 'static'
				},
				template: '/src/partials/register-editor/register-editor-view.tpl.html'
			};

			$scope.showRegisterEditor = function ($event, dataModel) {
				$($event.currentTarget).trigger('popup', ['edit', dataModel]);
			};

			$scope.translateHandling = handlingMethodService.translateHandling;

			$scope.onRegisterSaved = function (action, data) {
				$.extend(true, $scope.task_model, data);
				$scope.$emit('event:saveTaskModel', $scope.task_model.id, $scope.task_model);
			};

			$scope.printDoc = function () {
				var consultMethods = [],
					privileges = [];

				if ($scope.task_model.prop_isEmail) consultMethods.push("电子邮件");
				if ($scope.task_model.prop_isTel) consultMethods.push("电话");
				if ($scope.task_model.prop_isF2F) consultMethods.push("面谈");
				if ($scope.task_model.prop_isFax) consultMethods.push("传真");

				if ($scope.task_model.prop_internal) privileges.push("内部浏览");
				if ($scope.task_model.prop_external) privileges.push("客户浏览");

				var params = {
					sheetType: 'register',
					sheetData: {
						singleMapper: {
							customer_name: $scope.task_model.customer_name,
							customer_contact: $scope.task_model.customer_contact,
							customer_tel: $scope.task_model.customer_tel,
							customer_email: $scope.task_model.customer_email,
							customer_address: $scope.task_model.customer_address,
							register_content: $scope.task_model.register_content,
							report_date: $scope.task_model.report_date.split('T')[0],
							consult_date: $scope.task_model.consult_date.split('T')[0],

							consult_method: consultMethods.join(', '),
							privilege: privileges.join(', ')
						}
					}
				};

				printService.print(params, '打印登记表_TK' + $scope.task_model.id);
			}
		}]);

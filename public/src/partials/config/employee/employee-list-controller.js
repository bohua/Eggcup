/**
 * Created by Bli on 2014/4/28.
 */
angular.module('employee-list', [
	'ngRoute',
	'employee-resource',
	'employee-editor',
	'bootstrap-tagsinput'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/config/employee', {
			templateUrl: '/src/partials/config/employee/employee-list-view.tpl.html',
			controller: 'employeeListController',
			resolve: {
				employees: function (EMPLOYEE) {
					return EMPLOYEE.query().$promise;
				}
			}
		});
}]).controller('employeeListController', [
	'$scope',
	'EMPLOYEE',
	'employees',
	function ($scope, EMPLOYEE, employees) {
		/**
		 * Scope initializations
		 */
		$scope.headers = [
			'姓名',
			'职位',
			'电话',
			'手机',
			'邮箱'
		];

		$scope.employee_list = employees;

		$scope.employeeEditorConfig = {
			dialogOption: {
				overlay: true,
				shadow: true,
				flat: true,
				icon: '<i class="icon-briefcase"></i>',
				title: '详细信息',
				padding: 10,
				width: '80%',
				height: '300px',
				overlayClickClose: false
			},

			template: '/src/partials/config/employee/employee-editor-view.tpl.html',

			onShow: function (_dialogWin) {
				$.Metro.initInputs();
				_dialogWin.find('.auto-focus').focus();
				/*
				$('input[data-role="tagsinput"]').tagsinput({
					tagClass: function(tag) {
						switch(tag.type){
							case 'config': return 'label bg-darkGray';
							case 'custom': return 'label bg-darkBlue';
							case 'permit': return 'label bg-darkRed';
							default : return 'label bg-darkBlue';
						}
					},
					itemValue: 'id',
					itemText: 'value'
				});
				*/
			},

			api: {}
		};

		/**
		 * Closure functions
		 */
		function saveEmployee(model) {
			var employee = new EMPLOYEE(model);
			employee.$save(function(){
				 $scope.employee_list = EMPLOYEE.query();
			 });

		}

		function deleteEmployee(id) {
			EMPLOYEE.delete(id, function(){
				$scope.employee_list = EMPLOYEE.query();
			});
		}

		/**
		 * ng-click functions
		 */
		$scope.detail = function ($event, dataModel) {
			$($event.target).parent('tr').trigger('popup', ['edit', dataModel]);
		};

		$scope.new = function ($event) {
			$($event.currentTarget).trigger('popup', ['add']);
		};

		/**
		 * directive bindings
		 */
		$scope.confirmEmitted = function (action, data) {
			switch (action) {
				case 'update':
				{
					saveEmployee(data);
					break;
				}
				case 'remove':
				{
					deleteEmployee({id: data.id});
					break;
				}
			}
		}
	}]);
/**
 * Created by bli on 2014/5/8.
 */
angular.module('employee-list-service', ['employee-resource'])
	.factory('employeeListService', ['EMPLOYEE', function (EMPLOYEE) {
		var employeeList;
		var Service = {
			init: function () {
				employeeList = EMPLOYEE.query();
			},

			getEmployeeList: function () {
				return employeeList;
			},

			translateEmployee: function (employeeId) {
				var found = _.where(employeeList, {id: employeeId});
				if (found.length === 0) {
					return employeeId;
				} else {
					return found[0].name;
				}
			}
		};

		return Service;
	}]);
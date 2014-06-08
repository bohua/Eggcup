/**
 * Created by bli on 2014/5/8.
 */
angular.module('employee-list-service', ['employee-resource'])
	.factory('employeeListService', ['EMPLOYEE' , '$q', function (EMPLOYEE, $q) {
		var employeeList;
		var Service = {
			init: function () {
				EMPLOYEE.query(function(list){
					employeeList = list;
				});
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
			},

			reload: function(){
				var deferred = $q.defer();

				EMPLOYEE.query().$promise.then(function(list){
					employeeList = list;
					deferred.resolve(employeeList);
				});

				return deferred.promise;
			}
		};

		return Service;
	}]);
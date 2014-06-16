/**
 * Created by bli on 2014/5/8.
 */
angular.module('employee-list-service', ['employee-resource'])
	.factory('employeeListService', ['EMPLOYEE' , '$q', function (EMPLOYEE, $q) {
		var employeeList,
			initiator;

		var Service = {
			init: function () {
				initiator = EMPLOYEE.query(function (list) {
					employeeList = list;
				}).$promise;

				return initiator;
			},

			ready: function(){
				return initiator;
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

			getEmployeeDetail: function (employeeId) {
				return EMPLOYEE.get({employee_id: employeeId}).$promise;
			},

			saveEmployee: function (employeeModel) {
				var employee = new EMPLOYEE(employeeModel),
					that = this,
					deferred = $q.defer();

				employee.$save(
					function () {
						that.reload().then(function (employeeList) {
							deferred.resolve(employeeList);
						});
					}, function (failure) {
						throw failure;
						deferred.reject(failure);
					});

				return deferred.promise;
			},

			deleteEmployee: function (id) {
				var that = this,
					deferred = $q.defer();

				EMPLOYEE.delete(id, function () {
					that.reload().then(function(employeeList){
						deferred.resolve(employeeList);
					});
				}, function (failure) {
					throw failure;
					deferred.reject(failure);
				});

				return deferred.promise;
			},

			reload: function () {
				var deferred = $q.defer();

				EMPLOYEE.query().$promise.then(function (list) {
					employeeList = list;
					deferred.resolve(employeeList);
				});

				return deferred.promise;
			}
		};

		return Service;
	}]);
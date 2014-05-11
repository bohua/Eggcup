/**
 * Created by bli on 2014/5/7.
 */
angular.module('task-status-service', [])
	.factory('taskStatusService', ['$http', function ($http) {
		var statusList;

		function findStatus(statusCode){
			var found = _.where(statusList, {code: statusCode});
			if (found.length === 0) {
				return null;
			} else {
				return found;
			}
		}

		var Service = {
			init: function () {
				$http.get('/statusList').success(function(data){
					statusList = data;
				});
			},

			translateStatus: function (statusCode) {
				var found =  findStatus(statusCode);
				if (!found) {
					return statusCode;
				} else {
					return found[0].status;
				}
			},

			getPrecedence: function(statusCode){
				var found =  findStatus(statusCode);
				if (!found) {
					return [];
				} else {
					var status =  found[0];
					return status.precedence || [];
				}
			}
		};

		return Service;
	}]);
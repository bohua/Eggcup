/**
 * Created by bli on 2014/5/7.
 */
angular.module('task-status-service', [])
	.factory('taskStatusService', ['$http', function ($http) {
		var statusList;
		var Service = {
			init: function () {
				$http.get('/statusList').success(function(data){
					statusList = data;
				});
			},

			translateStatus: function (statusId) {
				var found = _.where(statusList, {code: statusId});
				if (found.length === 0) {
					return statusId;
				} else {
					return found[0].status;
				}
			}
		};

		return Service;
	}]);
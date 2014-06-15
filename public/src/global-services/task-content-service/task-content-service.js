/**
 * Created by Bohua on 2014-06-15.
 */

angular.module('task-content-service', ['task-resource'])
	.factory('taskContentService', ['TASK' , '$q', function (TASK, $q) {
		var Service = {
			saveTask: function(data){
				TASK.save(data);
			}
		};

		return Service;
	}]);

/**
 * Created by Bohua on 2014-06-15.
 */

angular.module('task-service', ['task-resource'])
	.factory('taskService', ['$location', '$route', '$http', 'TASK' , '$q', function ($location, $route, $http, TASK, $q) {
		var searchEngine,
			initiator,
			taskList;

		var Service = {
			init: function (employee_name) {
				var deferred = $q.defer();

				TASK.query({employee_name: employee_name}, function (list) {
					taskList = list;

					searchEngine = new Bloodhound({
						datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
						queryTokenizer: Bloodhound.tokenizers.whitespace,
						local: $.map(taskList, function (task) {
							return { value: task.id + " - " + task.slogan, id: task.id };
						}),
						remote: '/searchTask?q=%QUERY'
					});

					searchEngine.initialize().done(function () {
						deferred.resolve();
					});
				})

				initiator = deferred.promise;
				return initiator;
			},

			ready: function () {
				return initiator;
			},

			getTaskList: function () {
				return taskList;
			},

			reload: function (employee_name) {
				var deferred = $q.defer();

				TASK.query({employee_name: employee_name}, function (list) {
					taskList = list;
					deferred.resolve(taskList);
				});

				return deferred.promise;
			},

			getSearchEngine: function () {
				return searchEngine;
			},

			saveTask: function (task_model) {
				return TASK.save(task_model).$promise;
			},

			openTask: function (task_id) {
				$location.path('/task-editor/edit/' + task_id);
			},

			getTaskSheet: function (task_id, sheet_type) {
				return $http.get('/taskSheet/' + task_id, {params: {sheetType: sheet_type}});
			}
		};

		return Service;
	}]);

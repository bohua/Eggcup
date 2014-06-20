/**
 * Created by Bohua on 2014-06-15.
 */

angular.module('task-service', ['task-resource'])
	.factory('taskService', ['$location', '$route', '$templateCache', 'TASK' , '$q', function ($location, $route, $templateCache, TASK, $q) {
		var searchEngine,
			initiator,
			taskList;

		var Service = {
			init: function () {
				var deferred = $q.defer();

				TASK.query({statusGroup: ['ongoing']}, function (list) {
					taskList = list;

					searchEngine = new Bloodhound({
						datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
						queryTokenizer: Bloodhound.tokenizers.whitespace,
						local: $.map(taskList, function (task) {
							return { value: task.id + " - " + task.slogan, id: task.id };
						})
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

			reload: function () {
				var deferred = $q.defer();

				TASK.query({statusGroup: ['ongoing']}, function (list) {
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
//				var currentPageTemplate = $route.current.templateUrl;
//				$templateCache.remove(currentPageTemplate);
				$location.path('/task-editor/edit/' + task_id);
			}
		};

		return Service;
	}]);

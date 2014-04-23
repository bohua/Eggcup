/**
 * Created by Bli on 2014/4/7.
 */
angular.module('task-resource', ['ngResource'])
    .factory('TASK', ['$resource', function ($resource) {
        var TASK = $resource(
            '/task/:task_id',
            {task_id: '@id'}
        );

        return TASK;
    }]);
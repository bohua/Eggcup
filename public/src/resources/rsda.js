/**
 * Created by Bli on 2014/4/7.
 */
angular.module('rsda-resource', ['ngResource'])
    .factory('RSDA', ['$resource', function ($resource) {
        var RSDA = $resource(
            '/rsda/:rsda_id',
            {rsda_id: '@id'}
        );

        return RSDA;
    }]);
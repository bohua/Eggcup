/**
 * Created by Bohua on 2014-05-04.
 */
angular.module('tag-resource', ['ngResource'])
	.factory('TAG', ['$resource', function ($resource) {
		var TAG = $resource(
			'/tag/:tag_id',
			{
				tag_id: '@id'
			}
		);

		return TAG;
	}]);
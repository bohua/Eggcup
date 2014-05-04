/**
 * Created by Bohua on 2014-05-04.
 */
angular.module('tag-reference-service', ['tag-resource'])
	.factory('tagReferenceService', ['TAG', function (TAG) {
		var Service = {
			getSysTag : function(){
				return TAG.query({type: ['config', 'permit']}).$promise;
			}
		};

		return Service;
	}]);
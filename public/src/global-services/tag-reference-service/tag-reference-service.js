/**
 * Created by Bohua on 2014-05-04.
 */
angular.module('tag-reference-service', ['tag-resource'])
	.factory('tagReferenceService', ['TAG', function (TAG) {
		var sysTagList;
		var Service = {
			init: function () {
				sysTagList = TAG.query({type: ['config', 'permit']});
			},

			getSysTag: function () {
				return sysTagList;
			}
		};

		return Service;
	}]);
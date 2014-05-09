/**
 * Created by Bohua on 2014-05-04.
 */
angular.module('tag-reference-service', ['tag-resource'])
	.factory('tagReferenceService', ['TAG', function (TAG) {
		var tmpId = 1;
		var sysTagList;

		var Service = {
			init: function () {
				sysTagList = TAG.query({type: ['config', 'permit']});
			},

			getSysTag: function () {
				return sysTagList;
			},

			createTag: function( model ) {
				var found = _.where(sysTagList, {tag: model.tag});

				//TODO: Add authority check later
				if (found.length > 0) {
					return found[0];
				} else {
					return {
						id: 'new' + tmpId++,
						tag: model.tag,
						type: model.type || 'custom'
					}
				}
			}
		};

		return Service;
	}]);
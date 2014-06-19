/**
 * Created by Bli on 2014/6/19.
 */
angular.module('file-type-service', [])
	.factory('fileTypeService', ['$http', function ($http) {
		var fileTypeList,
			initiator;

		var Service = {
			init: function () {
				initiator = $http.get('/getFileTypeList').success(function (data) {
					fileTypeList = data;
				}).$promise;
			},

			ready: function(){
				return initiator;
			},

			translateFileType: function (fileType) {
				var found = fileTypeList[fileType];

				if(!found){
					return {
						type: '未知类型',
						icon: 'fa-file-o'
					}
				}else{
					return found;
				}
			}
		};

		return Service;
	}]);
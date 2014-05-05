/**
 * Created by Bli on 2014/4/29.
 */
angular.module('employee-editor', ['tag-reference-service', 'bootstrap-tagsinput'])
	.controller('employeeEditorController', ['$scope', 'tagReferenceService', function ($scope, tagReferenceService) {
		/**
		 * Initialize Emitters
		 */
		$scope.delete = function () {
			var confirmResult = confirm('确认删除么？');
			if (confirmResult === true) {
				$scope.Confirm('remove', false);
			}
		};

		/**
		 * Get system tags
		 */
		var sysTag = tagReferenceService.getSysTag();

		/*
		 //$scope.tagList = [{value: 1, text: '管理员', type:'config'}];
		 for(var i in $scope.dialog_data_model.tags){
		 var tag = $scope.dialog_data_model.tags[i];
		 $('input').tagsinput('add', tag);
		 }
		 */

		var tmpId = 1;
		$scope.tagGenerator = function (newTagValue) {
			var isSysTag;
			for (var i in sysTag) {
				if (sysTag[i].tag === newTagValue) {
					isSysTag = sysTag[i];
					break;
				}
			}

			if (isSysTag) {
				return {
					id: isSysTag.id,
					tag: isSysTag.tag,
					type: isSysTag.type
				}
			} else {
				return {
					id: 'new' + tmpId++,
					tag: newTagValue,
					type: 'custom'
				}
			}
		}

		$scope.getTagClass = function (tag) {
			switch (tag.type) {
				case 'config':
					return 'label bg-grayDark';
				case 'custom':
					return 'label bg-darkBlue';
				case 'permit':
					return 'label bg-darkRed';
				default :
					return 'label bg-darkBlue';
			}
		}
	}]);

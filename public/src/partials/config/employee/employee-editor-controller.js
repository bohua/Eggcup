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

		var tmpId = 1;
		$scope.tagGenerator = function (newTagValue) {
			return newTag = tagReferenceService
				.createTag({
					tag: newTagValue
				});

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

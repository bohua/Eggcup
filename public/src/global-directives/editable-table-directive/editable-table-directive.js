/**
 * Created by Bohua on 2014-06-12.
 */
angular.module('editable-table', ['edit-model'])
	.directive('editableTable', ['$timeout', function ($timeout) {
		var editableTable = {
			link: function ($scope, $element, $attributes) {
				$timeout(function(){
					var $table = $($element).editableTableWidget();

					var disabledTds = $($element).find('td[edit-disabled]');

					disabledTds.removeAttr('tabindex');
				});
			}
		};

		return editableTable;
	}]);


/**
 * Created by Bli on 2014/6/13.
 */
angular.module('table-content-handler', ['file-upload-field'])
	.directive('tableContentHandler', ['$timeout', function ($timeout) {
		var tableContentHandler = {
			restrict: "E",
			scope: {
				$option: "=option",
				$model: "=model"
			},
			templateUrl: "/src/global-directives/table-content-handler-directive/table-content-handler.tpl.html",
			link: {
				post: function postLink($scope, $element, $attributes) {
					var $table = $($element).parent().find($attributes.table);

					function highlightRow($row) {
						$row.effect('highlight', {color: '#428bca'}, 1500);
					}

					$scope.hasSelection = function () {
						return $table.find('tbody tr.active').length > 0;
					};

					$scope.getSelection = function () {
						return $table.find('tbody tr.active');
					};

					$table.children('tbody').on('click', function ($event) {
						var rowElement = $($event.target).closest('tr');

						$table.find('tr').removeClass('active');
						rowElement.addClass('active');
						$scope.$apply();
					});

					$scope.onCreate = function () {
						$scope.$model.push(_.clone($scope.$option.defaultRowValue));

						$timeout(function () {
							$table.editableTableWidget();
						});
					};

					$scope.onDelete = function () {
						var selectedRow = $table.find('tbody tr.active');
						if (selectedRow.length !== 0) {
							var scope = angular.element(selectedRow).scope();
							$scope.$model.splice(scope.$index, 1);
						}
					};

					$scope.fileUploaded = function (file) {
						var selectedRow = $table.find('tbody tr.active');
						if (selectedRow.length !== 0) {
							var scope = angular.element(selectedRow).scope();
							scope.sub_item.attachment.push(file);
						}

						$scope.$apply();
						highlightRow(selectedRow);
					};

					$scope.hasFileUploader = $scope.$option.hasFileUploader;
					$scope.hasCreateBtn = $scope.$option.hasCreateBtn;
					$scope.hasOpenBtn = $scope.$option.hasOpenBtn;
					$scope.hasDeleteBtn = $scope.$option.hasDeleteBtn;
				}
			}
		};

		return tableContentHandler;
	}]);


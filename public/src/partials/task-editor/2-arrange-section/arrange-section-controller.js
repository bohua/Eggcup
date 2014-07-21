/**
 * Created by Bli on 2014/6/16.
 */
angular.module('arrange-section', ['arrange-editor', 'handling-method-service', 'print-service'])
	.controller('arrangeSectionController', [
		'$scope',
		'$timeout',
		'handlingMethodService',
		'printService',
		function ($scope, $timeout, handlingMethodService, printService) {
			$scope.arrangeEditorConfig = {
				dialogOption: {
					backdrop: 'static'
				},
				template: '/src/partials/arrange-editor/arrange-editor-view.tpl.html'
			};

			$scope.showArrangeEditor = function ($event) {
				$scope.task_model.arrangeSheet.inheritAssignee = $scope.task_model.assignee;
				$($event.currentTarget).trigger('popup', ['edit', $scope.task_model.arrangeSheet]);
			};

			$scope.translateHandling = handlingMethodService.translateHandling;

			$scope.onArrangeSaved = function (action, data) {
				$scope.task_model.arrangeSheet = data;

				if ($scope.task_model.arrangeSheet.arrangement_assignee) {
					$scope.task_model.assignee = $scope.task_model.arrangeSheet.arrangement_assignee;
				}
				var o = {
					id: $scope.task_model.id,
					assignee: $scope.task_model.assignee,
					arrangeSheet: data
				};
				$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
			};

			$scope.$on('newArrange', function () {
				$timeout(function () {
					$('[dialog-config="arrangeEditorConfig"]').trigger('popup', ['new', $scope.task_model.arrangeSheet]);
				});

			});

			$scope.printDoc = function () {
				var params = {
					sheetType: 'arrange',
					sheetData: {
						singleMapper: {
							task_id: $scope.task_model.id,
							handling: handlingMethodService.translateHandling($scope.task_model.handling),
							report_date: $scope.task_model.report_date.split('T')[0],
							slogan: $scope.task_model.slogan,
							arrangement_date: $scope.task_model.arrangeSheet.arrangement_date.split('T')[0],
							arrangement_assigner: $scope.task_model.arrangeSheet.arrangement_assigner,
							arrangement_assignee: $scope.task_model.arrangeSheet.arrangement_assignee,
							start_date: $scope.task_model.arrangeSheet.start_date.split('T')[0],
							end_date: $scope.task_model.arrangeSheet.end_date.split('T')[0],
							arrangement_comment: $scope.task_model.arrangeSheet.arrangement_comment
						}
					}
				};

				printService.print(params, '打印审核表_TK' + $scope.task_model.id);
			};
		}]);

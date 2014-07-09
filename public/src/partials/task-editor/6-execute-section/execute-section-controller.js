/**
 * Created by bli on 2014/6/9.
 */
angular.module('execute-section', ['execute-editor', 'execute-detail-editor', 'reminder-editor'])
	.controller('executeSectionController', ['$scope', function ($scope) {
		/**
		 * Execute Editor Initialization
		 */
		$scope.executeEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/execute-editor/execute-editor-view.tpl.html'
		};

		$scope.showExecuteEditor = function ($event, dataModel) {
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getExecuteModel = function () {
			return $scope.task_model.executeSheet;
		}

		$scope.onExecuteSaved = function (action, data) {
			$scope.task_model.executeSheet = data;
			var o = {
				id: $scope.task_model.id,
				executeSheet: data
			}
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		}

		/**
		 * Detail Editor Initialization
		 */
		$scope.detailEditorConfig = {
			dialogOption: {
				backdrop: 'static',
				keyboard: false
			},
			template: '/src/partials/execute-editor/execute-detail-editor-view.tpl.html'
		};

		$scope.showDetailEditor = function ($event, dataModel) {
			var mode = $scope.canEdit ? 'edit' : 'readOnly';
			dataModel = dataModel || [];
			$($event.currentTarget).trigger('popup', [mode, dataModel]);
		};

		$scope.getDetailModel = function () {
			return $scope.task_model.executeSheet.subItem;
		}

		$scope.onDetailSaved = function (action, data) {
			$scope.task_model.executeSheet.subItem = data;

			var o = {
				id: $scope.task_model.id,
				executeSheet: {
					id: $scope.task_model.executeSheet.id,
					subItem: data
				}
			}
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		}

		/**
		 * Reminder Editor Initialization
		 */
		$scope.reminderEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/reminder-editor/reminder-editor-view.tpl.html'
		};

		$scope.showReminderEditor = function ($event, dataModel) {
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getReminderModel = function () {
			return {
				customer_name: $scope.task_model.customer_name,
				contract_topic: $scope.task_model.contractSheet.contract_topic,
				contract_date: $scope.task_model.contractSheet.contract_date,
				contract_due_date: $scope.task_model.contractSheet.contract_due_date,

				reminder_date: new Date(),
				reminder_due_date: new Date(),
				reminder_service: '',
				reminder_expense: 0
			};
		};

		$scope.onReminderSaved = function (action, data) {
			$scope.task_model.reminderSheet = $scope.task_model.reminderSheet || {
				subItem: []
			};

			$scope.task_model.reminderSheet.subItem.push(data);

			var o = {
				id: $scope.task_model.id,
				reminderSheet: $scope.task_model.reminderSheet
			};
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		};
	}]);

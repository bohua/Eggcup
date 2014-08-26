/**
 * Created by Bli on 2014/6/16.
 */
angular.module('reply-section', ['reply-editor', 'attach-editor', 'appointment-editor', 'print-service'])
	.controller('replySectionController', [
		'$scope',
		'$timeout',
		'printService',
		function ($scope, $timeout, printService) {

			/**
			 * Reply Editor Initialization
			 */
			$scope.replyEditorConfig = {
				dialogOption: {
					backdrop: 'static'
				},
				template: '/src/partials/reply-editor/reply-editor-view.tpl.html'
			};

			$scope.showReplyEditor = function ($event, dataModel, mode) {
				if(!$scope.canEdit){
					mode = 'readOnly';
				}

				if ($($event.target).closest('td').hasClass('attachment-td')) {
					return;
				}

				dataModel.handling = $scope.task_model.handling;
				dataModel.customer_contact = $scope.task_model.customer_contact;
				dataModel.inherit_consult_context = $scope.task_model.register_content;

				$($event.currentTarget).trigger('popup', [mode || 'readOnly', dataModel]);
			};

			function updateReplySubItem(replySheet, updatedItem) {
				if (!updatedItem.id) {
					replySheet.subItem.push(updatedItem);
					return true;
				}

				for (var i in replySheet.subItem) {
					var item = replySheet.subItem[i];
					if (item.id === updatedItem.id) {
						replySheet.subItem[i] = updatedItem;
						return true;
					}
				}

				return false;
			}
			function removeReplySubItem(replySheet, removedItem){
				for (var i in replySheet.subItem) {
					var item = replySheet.subItem[i];
					if (item.id === removedItem.id) {
						replySheet.subItem.splice(i, 1);
						return true;
					}
				}

				return false;
			}

			$scope.onReplySaved = function (action, data) {
				switch (action) {
					case 'remove':
					{
						removeReplySubItem($scope.task_model.replySheet, data);
						break;
					}

					case 'new':
					case 'update':
					{
						updateReplySubItem($scope.task_model.replySheet, data);
						break;
					}
				}

				var o = {
					id: $scope.task_model.id,
					replySheet: $scope.task_model.replySheet
				};
				$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
			};


			$scope.$on('newArrange', function () {
				$timeout(function () {
					$scope.task_model.replySheet.handling = $scope.task_model.handling;
					$scope.task_model.replySheet.customer_contact = $scope.task_model.customer_contact;
					$('[dialog-config="replyEditorConfig"]').trigger('popup', ['new', $scope.task_model.replySheet]);
				});

			});

			/**
			 * Appointment Editor Initialization
			 */
			$scope.appointmentEditorConfig = {
				dialogOption: {
					backdrop: 'static'
				},
				template: '/src/partials/appointment-editor/appointment-editor-view.tpl.html'
			};

			$scope.showAppointmentEditor = function ($event, dataModel) {
				$($event.currentTarget).trigger('popup', ['edit', dataModel]);
			};

			$scope.getAppointmentModel = function () {
				return {
					customer_name: $scope.task_model.customer_name,
					customer_contact: $scope.task_model.customer_contact,
					customer_tel: $scope.task_model.customer_tel,
					customer_address: $scope.task_model.customer_address,
					customer_email: $scope.task_model.customer_email,
					consult_topic: $scope.task_model.register_topic,
					appointment_date: new Date(),
					appointment_address: $scope.task_model.replySheet.meeting_address,
					appointment_desc: ''
				};
			};

			$scope.onAppointmentSaved = function (action, data) {
				$scope.task_model.appointmentSheet = $scope.task_model.appointmentSheet || {
					subItem: []
				};

				$scope.task_model.appointmentSheet.subItem.push(data);

				var o = {
					id: $scope.task_model.id,
					appointmentSheet: $scope.task_model.appointmentSheet
				};
				$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
			};

			$scope.printDoc = function () {
				var sheetType = $scope.task_model.handling === 0 ? 'reply_a' : 'reply_b';
				var consultMethods = [],
					privileges = [];

				if ($scope.task_model.prop_isEmail) consultMethods.push("电子邮件");
				if ($scope.task_model.prop_isTel) consultMethods.push("电话");
				if ($scope.task_model.prop_isF2F) consultMethods.push("面谈");
				if ($scope.task_model.prop_isFax) consultMethods.push("传真");

				if ($scope.task_model.prop_internal) privileges.push("内部浏览");
				if ($scope.task_model.prop_external) privileges.push("客户浏览");

				var params = {
					sheetType: sheetType,
					sheetData: {
						singleMapper: {
							customer_name: $scope.task_model.customer_name,
							customer_contact: $scope.task_model.customer_contact,
							customer_tel: $scope.task_model.customer_tel,
							customer_email: $scope.task_model.customer_email,
							customer_address: $scope.task_model.customer_address,
							report_date: $scope.task_model.report_date.split('T')[0],

							reply_date: $scope.task_model.replySheet.reply_date.split('T')[0],

							consult_context: $scope.task_model.replySheet.consult_context,
							reply_context: $scope.task_model.replySheet.reply_context,
							law_context: $scope.task_model.replySheet.law_context,
							reply_person: $scope.task_model.replySheet.reply_person,
							meeting_address: $scope.task_model.replySheet.meeting_address,
							meeting_people_A: $scope.task_model.replySheet.meeting_people_A,
							meeting_people_B: $scope.task_model.replySheet.meeting_people_B,

							consult_method: consultMethods.join(', '),
							privilege: privileges.join(', ')
						}
					}
				};

				printService.print(params, '打印回复表_TK' + $scope.task_model.id);
			};

		}]);

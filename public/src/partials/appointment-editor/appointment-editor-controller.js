/**
 * Created by Bli on 2014/4/29.
 */
angular.module('appointment-editor', ['toggle-button-model', 'pop-confirm', 'login-session-service'])
	.controller('appointmentEditorController', [
		'$scope',
		'loginSessionService',
		function ($scope, loginSessionService) {
			$scope.dialog_data_model.appointment_sent = new Date();

		}]);

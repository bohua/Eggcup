/**
 * Created by Bli on 2014/6/13.
 */
angular.module('sign-in', ['login-session-service'])
	.controller('signInController', [
		'$scope',
		'$rootScope',
		'$timeout',
		'loginSessionService',
		function ($scope, $rootScope, $timeout, loginSessionService) {
			$scope.loginFail = false;
			$scope.username = 'fantasy';
			$scope.password = '1234';

			var loginButton = $('#sign-in-panel button[type="submit"] span');
			var loadingButton = $('<span> 验证中... </span>');
			var loginIcon = $('#sign-in-panel button[type="submit"] i');
			var loadingIcon = $('<i class="fa fa-spinner fa-spin fa-fw"> &nbsp; </i>');

			var logoImg = new Image();
			logoImg.src = '/images/logo.png';
			logoImg.onload = function(){
				$('#sign-in-panel').animate({
					opacity: 1
				}, 1000);
			};

			$scope.signin = function () {
				$scope.loginFail = false;

				loginButton.replaceWith(loadingButton);
				loginIcon.replaceWith(loadingIcon);

				$timeout(function(){
					loginSessionService
						.login($scope.username, $scope.password)
						.then(function () {
							$('#sign-in-panel').animate({
								opacity: 0,
								top: '-=300px'
							}, 500, function () {
								$('#sign-in-panel').hide();
								$scope.$emit('loginSuccess');
							});

						}, function () {
							$scope.loginFail = true;
							loadingButton.replaceWith(loginButton);
							loadingIcon.replaceWith(loginIcon);
						});
				}, 1000);
			};
		}]);
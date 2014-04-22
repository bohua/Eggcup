/**
 * Created by Bohua on 14-2-10.
 */
angular.module('left-menu', [])
	.controller('leftMenuController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
		$http.get('/getLeftMenu')
			.success(function (data) {
				$scope.menus = data;


				$timeout(function(){
					$('#left-stage').find('[data-role=dropdown]').dropdown();
					$('#left-stage').find('.pull-menu, .menu-pull').each(function () {
						$(this).PullDown();
					});
				},1);
			});

		$scope.toggleStatus = 'expand';

		$scope.toggleLeftMenu = function () {
			var delay = 200;
			var leftOffset = 150;

			//hide all submenus when toggling left panel
			$('.sidebar-menu>ul').hide();

			if ($scope.toggleStatus === 'expand') {
				$('#left-stage').addClass('narrow-menu').animate({
					width: "-=" + leftOffset
				}, delay, function () {
					//$('#left-stage').hide();
					$scope.toggleStatus = 'collapse';
				});
				$('#right-stage').animate({
					'padding-left': "-=" + leftOffset
				}, delay,function(){
					$(window).resize();
				});
			} else {
				//$('#left-stage').show();
				$('#left-stage').animate({
					width: "+=" + leftOffset
				}, delay, function () {
					$('#left-stage').removeClass('narrow-menu');
					$scope.toggleStatus = 'expand';
				});
				$('#right-stage').animate({
					'padding-left': "+=" + leftOffset
				}, delay,function(){
					$(window).resize();
				});
			}
		};

		$scope.hasSubMenu = function (menu) {
			return menu.submenus !== undefined;
		};

		$scope.hasLink = function(link){
			return link !== undefined;
		};

		$scope.showSubMenu = function ($event) {
			var submenu = $($event.currentTarget).next('ul');

			if (submenu.length > 0 && $scope.toggleStatus === 'expand') {
				if (submenu.is(':visible')) {
					submenu.hide();
				} else {
					submenu.show();
				}
			}
		};
	}]);
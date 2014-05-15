/**
 * Created by Bohua on 14-2-10.
 */
angular.module('left-menu-pop', ['screen-mask-service'])
	.controller('leftMenuPopController', ['$scope', '$http', '$timeout','screenMaskService', function ($scope, $http, $timeout, screenMaskService) {
		$http.get('/getLeftMenu')
			.success(function (data) {
				$scope.menus = data;

				$timeout(function () {
					$('#left-stage').find('[data-role=dropdown]').dropdown();
					$('#left-stage').find('.pull-menu, .menu-pull').each(function () {
						$(this).PullDown();
					});
				}, 1);
			});

		var toggled = false;

		function toggleLeftMenu($event, action) {
			// Do nothing when already done
			if(action === toggled){
				return;
			}

			var delay = 200;
			var leftOffset = 300;

			//hide all submenus when toggling left panel
			$('.sidebar-menu>ul').hide();

			if (toggled) {
				screenMaskService.hide();
				$('#left-stage').animate({
					left: - leftOffset
				}, delay, function () {
					toggled = false;
				});
			} else {
				screenMaskService.show();
				$('#left-stage').animate({
					left: 0
				}, delay, function () {
					toggled = true;
					$(document).one('contextmenu', function(){
						$scope.$emit('toggleLeftMenu', false);
					});
					$('#screen-mask').one('click', function(){
						$scope.$emit('toggleLeftMenu', false);
					});
				});
			}
		}

		$scope.$on('toggleLeftMenu', toggleLeftMenu);

		$scope.hasSubMenu = function (menu) {
			return menu.submenus !== undefined;
		};

		$scope.hasLink = function (link) {
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

		$scope.toggleLeftMenu = toggleLeftMenu;
	}]);
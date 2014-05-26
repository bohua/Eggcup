/**
 * Created by bli on 2014/5/26.
 */
angular.module('price-tab-controller', [])
	.controller('priceTabController', ['$scope', function($scope){
		/**
		 * Initialize Emitters
		 */
		$scope.deleteSubItem = function(event, item){

		}

		/**
		 * popup window configuration
		 */
		$scope.priceSubitemEditor ={
			dialogOption: {
				overlay: true,
				shadow: true,
				flat: true,
				icon: '<i class="icon-briefcase"></i>',
				title: '报价明细',
				padding: 10,
				width: '80%',
				height: '500px',
				overlayClickClose: false
			},

			template: '/src/partials/task-editor/price-tab/price-tab-detail-editor-view.tpl.html',

			onShow: function (_dialogWin) {
				$.Metro.initInputs();
				_dialogWin.find('.auto-focus').focus();
			},

			api: {
			}
		};
		/**
		 * ng-click functions
		 */
		$scope.addSubItem = function ($event) {
			$($event.currentTarget).trigger('popup', ['add']);
		};

		$scope.editSubItem = function ($event, dataModel) {
			$($event.target).parent('tr').trigger('popup', ['edit', dataModel]);
		};

		$scope.downloadAttachment = function($event){
			console.log('download');
		};
	}]);

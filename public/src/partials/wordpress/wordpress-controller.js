/**
 * Created by bli on 2014/8/13.
 */
angular.module('wordpress', [
	'ngRoute',
	'wordpress-resource',
	'customer-list-service',
	'employee-list-service',
	'permission-service'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/wordpress', {
			templateUrl: '/src/partials/wordpress/wordpress-view.tpl.html',
			controller: 'wordpressController',
			reloadOnSearch: true
		});
}]).controller('wordpressController', [
	'$scope',
	'$routeParams',
	'$location',
	'$http',
	'WORDPRESS',
	'customerListService',
	'employeeListService',
	'permissionService',
	function ($scope, $routeParams, $location, $http, WORDPRESS, customerListService, employeeListService, permissionService) {
		$scope.queryPath = '/getWordpressList';
		$scope.displayMode = 'list';

		/**
		 * Param parsing
		 */
		var params = $location.search();

		$http.get($scope.queryPath, {params: params}).success(function (data) {
			$scope.wordpressList = data;
		});
		if (!_.isEmpty(params) && _.isEmpty(data)) {
			alert('没有符合条件的数据!');
		}

		/**
		 * Initialize query conditions
		 */
		$scope.condition = {
			topic: params.topic || '',
			start_date: params.start_date || new Date(),
			end_date: params.end_date || new Date(),
			customer_name: params.customer_name || ''
		};

		/**
		 * ng-click bindings
		 */
		function loadWordpress(id){
			var currentWordpress = WORDPRESS.get({wordpress_id: id}, function(){
				$scope.currentWordpress = currentWordpress;
				$scope.displayMode = 'detail';
			});
		}

		$scope.getWordpress = function(model){
			loadWordpress(model.id);
		};

		$scope.backToListMode = function(){
			$scope.displayMode = 'list';

			$scope.currentWordpress = null;
		};


		/**
		 * Wordpress editor Initialization
		 */
		$scope.wordpressEditorConfig = {
			dialogOption: {
				backdrop: 'static',
				keyboard: false
			},
			template: '/src/partials/wordpress/wordpress-editor-view.tpl.html'
		};

		$scope.showWordpressEditor = function ($event, dataModel, mode) {
			$($event.currentTarget).trigger('popup', [mode, dataModel || {}]);
		};

		$scope.onWordpressUpdated = function (action, data) {
			$http.post('/wordpressSubItem', {data: data})
				.success(function(){
					loadWordpress(data.wordpress_id);
				});


			/*
			$scope.task_model.expenseSheet.subItem = data;

			var o = {
				id: $scope.task_model.id,
				expenseSheet: {
					id: $scope.task_model.expenseSheet.id,
					subItem: data
				}
			};
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
			*/
		};
	}]);
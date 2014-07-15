/**
 * Created by bli on 2014/6/9.
 */
angular.module('contract-section', ['contract-editor', 'contract-detail-editor', 'print-service'])
	.controller('contractSectionController', ['$scope', 'printService', function ($scope, printService) {
		/**
		 * Contract Editor Initialization
		 */
		$scope.contractEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/contract-editor/contract-editor-view.tpl.html'
		};

		$scope.showContractEditor = function ($event, dataModel) {
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getContractModel = function () {
			return $scope.task_model.contractSheet;
		}

		$scope.onContractSaved = function (action, data) {
			$scope.task_model.contractSheet = data;
			var o = {
				id: $scope.task_model.id,
				contractSheet: data
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
			template: '/src/partials/contract-editor/contract-detail-editor-view.tpl.html',
			onShow: function () {

			}
		};

		$scope.showDetailEditor = function ($event, dataModel) {
			var mode = $scope.canEdit ? 'edit' : 'readOnly';
			dataModel = dataModel || [];
			$($event.currentTarget).trigger('popup', [mode, dataModel]);
		};

		$scope.getDetailModel = function () {
			return $scope.task_model.contractSheet.subItem;
		}

		$scope.onDetailSaved = function (action, data) {
			$scope.task_model.contractSheet.subItem = data;

			var o = {
				id: $scope.task_model.id,
				contractSheet: {
					id: $scope.task_model.contractSheet.id,
					subItem: data
				}
			}
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		}

		/**
		 * Print Configuration
		 */
		$scope.printDoc = function () {
			var privileges = [];
			var contract_date = $scope.task_model.contractSheet.contract_date || "";
			var contract_due_date = $scope.task_model.contractSheet.contract_due_date || "";

			if ($scope.task_model.prop_internal) privileges.push("内部浏览");
			if ($scope.task_model.prop_external) privileges.push("客户浏览");

			var params = {
				sheetType: 'contract',
				sheetData: {
					singleMapper: {
						contract_date: contract_date.split('T')[0],
						contract_due_date: contract_due_date.split('T')[0],

						contract_A: $scope.task_model.contractSheet.contract_A,
						contract_B: $scope.task_model.contractSheet.contract_B,

						contract_price: $scope.task_model.contractSheet.contract_price,

						privilege: privileges.join(', ')
					},

					rowMapper: {
						rowData : _.map($scope.task_model.contractSheet.subItem, function (item) {
							var o = {
								expense: item.expense,
								pay_method: item.pay_method
							};

							if (item.pay_date) {
								o.pay_date = item.pay_date.split('T')[0];
							}
							if (item.due_date) {
								o.due_date = item.due_date.split('T')[0];
							}

							return o;
						})
					}
				}
			};

			printService.print(params);
		}
	}]);

/**
 * Created by bli on 2014/6/9.
 */
angular.module('proposal-section', ['proposal-editor'])
	.controller('proposalSectionController', ['$scope', function ($scope) {
		$scope.proposalEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/proposal-editor/proposal-editor-view.tpl.html',
			onShow: function(e){
				$(e.currentTarget).find('.input-group.date').datetimepicker();
			}
		};

		$scope.showProposalEditor = function($event, dataModel){
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getProposalModel = function(){
			return $scope.task_model.proposalSheet;
		}

	}]);

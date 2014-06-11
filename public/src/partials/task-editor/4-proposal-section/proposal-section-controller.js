/**
 * Created by bli on 2014/6/9.
 */
angular.module('proposal-section', ['proposal-editor', 'attach-editor'])
	.controller('proposalSectionController', ['$scope', function ($scope) {
		$scope.proposalEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/proposal-editor/proposal-editor-view.tpl.html'
		};

		$scope.showProposalEditor = function($event, dataModel){
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getProposalModel = function(){
			return $scope.task_model.proposalSheet;
		}

		/**
		 * Attachment Editor Initialization
		 */
		$scope.attachEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/attach-editor/attach-editor-view.tpl.html',
			onShow: function(){
				$('#fileupload').fileupload({
					dataType: 'json',
					done: function (e, data) {
						$.each(data.result.files, function (index, file) {
							$('<p/>').text(file.name).appendTo(document.body);
						});
					}
					/*
					progressall: function (e, data) {
						var progress = parseInt(data.loaded / data.total * 100, 10);
						$('.progress-bar .bar').css(
							'width',
								progress + '%'
						);
					},
					add: function (e, data) {
						data.context = $('<button><i.icon-upload-3/><span>上传</span></button>').appendTo($element).click(function () {
							data.context = $('<p/>').text('Uploading...').replaceAll($(this));
							data.submit();
						});
					},
					done: function (e, data) {
						$.each(data.result.files, function (index, file) {
							data.context.text('Upload finished.');
							$scope.dialog_data_model.push({
								file_name: file.name
							});
						});
					}*/
				});
			}
		};

		$scope.showAttachEditor = function($event, dataModel){
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getAttachModel = function(){
			return $scope.task_model.proposalSheet.attachment;
		}

	}]);

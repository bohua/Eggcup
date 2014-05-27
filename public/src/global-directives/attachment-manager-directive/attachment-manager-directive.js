/**
 * Created by bli on 2014/5/26.
 */
angular.module('attachment-manager', [])
	.directive('attachmentManager', [ function () {
		var Dialog = {
			restrict: 'E',
			scope: {
				dataList: "=",
				emitUploaded: '&onUploaded',
				emitDeleted: '&onDeleted'
			},
			templateUrl: '/src/global-directives/attachment-manager-directive/attachment-manager.tpl.html',
			link: function ($scope, $element, $attributes) {
				//$.Metro.initInputs($element);
				$.Metro.initProgreeBars($element);

				$('#fileupload').fileupload({
					dataType: 'json',
					progressall: function (e, data) {
						var progress = parseInt(data.loaded / data.total * 100, 10);
						$('.progress-bar .bar').css(
							'width',
								progress + '%'
						);
					},
					add: function (e, data) {
						data.context = $('<button><i.icon-upload-3/><span>上传</span></button>').appendTo($element).click(function(){
							data.context = $('<p/>').text('Uploading...').replaceAll($(this));
							data.submit();
						});
					},
					done: function (e, data) {
						$.each(data.result.files, function (index, file) {
							data.context.text('Upload finished.');
							$scope.dataList.push({
								file_name: file.name
							});
						});
					}
				});


				$scope.UploadFile = function (file) {

					$scope.emitUploaded({action: action, data: $scope.dialog_data_model});
				};

				$scope.DownloadFile = function () {
				};

				$scope.DeleteFile = function () {
					$scope.emitDeleted();
				};
			}
		};

		return Dialog;
	}]);
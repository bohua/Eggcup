/**
 * Created by Bohua on 2014-06-11.
 */
angular.module('file-upload-field', [])
	.directive('fileUploadField', function () {
		var fileUploadField = {
			restrict: "E",
			scope: {
				emitUploaded: '&onUploaded',
				ngDisabled : '='
			},
			templateUrl: "/src/global-directives/file-upload-field-directive/file-upload-field.tpl.html",
			link: function ($scope, $element, $attributes) {

				(function setupFileUpload() {
					var uploadShadow = $('<input type="file" name="files[]" data-url="/file-upload" class="fileupload"/>'),
						progressBar = $($element).find('.progress .progress-bar');

					$scope.selectUploadFile = function () {
						progressBar.css('width', '0%');
						uploadShadow.click();
					};
					uploadShadow.change(function () {
						$this = $(this);
						progressBar.text($this.val());
					});

					uploadShadow.fileupload({
						dataType: 'json',
						progressall: function (e, data) {
							var progress = parseInt(data.loaded / data.total * 100, 10);
							progressBar.css('width', progress + '%');
						},
						done: function (e, data) {
							uploadShadow.remove();
							setupFileUpload();
							$scope.emitUploaded({file: data.result.files});
						}
					});
				})();
			}
		}

		return fileUploadField;
	});
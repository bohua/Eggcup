/**
 * Created by bli on 2014/6/9.
 */
angular.module('final-section', [])
	.controller('finalSectionController', ['$scope', '$timeout', function ($scope, $timeout) {
		$timeout(function(){
			var client = new ZeroClipboard($(".copy-button"));

			client.on( "copy", function (event) {
				var clipboard = event.clipboardData;
				clipboard.setData( "text/html", $('#final-report-table').html() );

				alert('已复制到剪贴板！');
			});
		});
	}]);

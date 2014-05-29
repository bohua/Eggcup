/**
 * Created by Bohua on 2014-05-28.
 */
angular.module('scroll-to', [])
	.directive('scrollTo', function ($location, $anchorScroll) {
		return function(scope, element, attrs) {
			$(element).on('click', function(event) {
				event.stopPropagation();
				event.preventDefault();
				var location = attrs.scrollTo;
				$location.hash(location);
				$anchorScroll();
			});
		};
	});

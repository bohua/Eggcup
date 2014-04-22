/**
 * Created by bli on 2014/4/10.
 */
angular.module('keyboard-support', [])
	.directive('keyboardSupport', [ '$timeout', function ($timeout) {
		var keyboardSupport = {
			restrict: 'A',
			link: function ($scope, $element, $attributes) {
				var tablist = $($element).find(':tabbable');

				$element.on('keydown', function ($event) {
					if ($event.keyCode === 13) {
						$timeout(function () {
							$.tabNext();
						});

						return false;
					}

					var el = $event.target;
					if (el.tagName === 'INPUT') {
						if ($event.keyCode === 37 && ($(el).attr('type') === "checkbox" || $(el).caret().start === 0)) {
							if(!el.hasAttribute('tab-start')) {
								$.tabPrev();
							}
							return false;
						}

						if ($event.keyCode === 39 && ($(el).attr('type') === "checkbox" || $(el).caret().start === el.value.length)) {
							if(!el.hasAttribute('tab-end')) {
								$.tabNext();
							}
							return false;
						}
					} else if (el.tagName === 'SELECT') {
						if ($event.keyCode === 37) {
							if(!el.hasAttribute('tab-start')) {
								$.tabPrev();
							}

							$event.preventDefault();
							return false;
						}

						if ($event.keyCode === 39) {
							if(!el.hasAttribute('tab-end')) {
								$.tabNext();
							}

							$event.preventDefault();
							return false;
						}
					}
				});
			}
		}

		return keyboardSupport;
	}]);

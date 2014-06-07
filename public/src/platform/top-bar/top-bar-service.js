/**
 * Created by Bohua on 14-2-13.
 */

angular.module('top-bar-service', [])
	.factory('topBarService', [function () {
		var navBlockMap = {
			'/': '#nav-block-dashboard',
			'/dashboard': '#nav-block-dashboard',
			'/task-editor': '#nav-block-task',
			'/config/customer': '#nav-block-config'
		}
		var Service = {
			trackNavBlock : function(route){

				this.unTrackNavBlocks();

				if(route.match(/^\/task-editor\//)){
					route = '/task-editor';
				}
				if(navBlockMap[route]){
					$(navBlockMap[route]).addClass('active');
				}
			},

			unTrackNavBlocks: function(){
				$('#topbar-collapse>ul>li').removeClass('active');
			}
		};

		return Service;
	}]);

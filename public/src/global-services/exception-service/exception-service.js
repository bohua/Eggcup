/**
 * Created by Bohua on 2014-06-14.
 */
angular.module('exception-service', [])
	.factory('handlingMethodService', function () {
		var methods;

		var Service = {
			init : function(){
				methods = {
					0 : '回复解答',
					1 : '提案解答'
				}
			},

			translateHandling : function(handling){
				if(methods[handling]){
					return methods[handling];
				} else{
					return "";
				}
			},

			getHandlingList: function(){
				return methods;
			}
		};

		return Service;
	});
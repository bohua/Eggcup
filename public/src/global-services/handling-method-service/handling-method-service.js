/**
 * Created by bli on 2014/6/9.
 */
angular.module('handling-method-service', [])
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
			}
		};

		return Service;
	});
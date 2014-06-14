/**
 * Created by Bohua on 2014-06-14.
 */

angular.module('login-session-service', [])
	.factory('loginSessionService', ['$http', '$q', function ($http, $q) {
		var session;

		var Service = {
			init : function(){
				session = {
					hasSignIn : false
				}
			},

			login: function(username, password){
				var deferred = $q.defer();
				$http.post('/login', {username: username, password: password})
					.success(function (result) {
						if(result.success){
							session = result.login_pass;
							deferred.resolve();
						}else{
							deferred.reject();
						}
					}).error(function(failure){
						throw failure;
					});

				return deferred.promise;
			},

			getLoginStatus: function(){
				return session.hasSignIn;
			}
		};

		return Service;
	}]);


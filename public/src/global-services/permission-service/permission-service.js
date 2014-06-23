/**
 * Created by Bohua on 2014-06-23.
 */
angular.module('permission-service', ['login-session-service'])
	.factory('permissionService', ['$http', '$q', 'loginSessionService', function ($http, $q, loginSessionService) {
		var permissionMap,
			initiator;

		var permissionService = {
			init: function () {
				var userPermitLevel = loginSessionService.getPermitLevel();

				initiator = $q.defer();

				$http.get('/getPermission', {params: {userPermitLevel: userPermitLevel}})
					.success(function (map) {
						permissionMap = map;
						initiator.resolve();
					})
					.error(function (error) {
						initiator.reject(error);
					});

				return initiator.promise;
			},

			ready: function () {
				return initiator;
			},

			hasPermission: function (permission_code) {
				var found = _.where(permissionMap, {code: permission_code});

				if (found.length > 0) {
					return found[0];
				}
				return null;
			}
		};

		return permissionService;
	}]);
/**
 * Created by Bli on 2014/4/7.
 */
var Q = require("q")
module.exports = function (exception){
	var deferred = Q.defer();

	deferred.resolve('ERR_UNKOWN_ERROR');

	return deferred.promise;
};
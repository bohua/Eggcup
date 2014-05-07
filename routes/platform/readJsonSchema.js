/**
 * Created by Bli on 14-3-02.
 */
var fs = require('fs');
var Q = require('q');

module.exports = function (schemaPath) {
	var deferred = Q.defer();
	try{
		deferred.resolve(JSON.parse(fs.readFileSync(schemaPath, 'utf8')));
	}catch(e){
		//Catch exceptions
		deferred.reject(e);
	}
	return deferred.promise;
};
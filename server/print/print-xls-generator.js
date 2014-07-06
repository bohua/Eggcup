/**
 * Created by Bohua on 2014-07-01.
 */

var exec = require('child_process').exec;
var Q = require('q');

Gen = function (docType, expPath, dataMapper) {
	var deferred = Q.defer();
	var tplMapper = {
		"register" : "templates/登记表.xls"
	}

	var cmd = __dirname + "/lib/eggcupXlsParser.exe" +
		" -tpl " + tplMapper[docType] +
		" -export " + expPath +
		" -json " + JSON.stringify(dataMapper);

	exec(cmd, function(error, stdout, stderr){
		if (error !== null) {
			deferred.reject(error);
		} else {
			deferred.resolve();
		}
	});

	return deferred.promise;
};

module.exports = Gen;

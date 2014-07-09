/**
 * Created by Bohua on 2014-07-01.
 */

var exec = require('child_process').exec;
var Q = require('q');

Gen = function (tplPath, expPath, dataMapper) {
	var deferred = Q.defer();

	var json = JSON.stringify(dataMapper).replace(/\"/g, "'");
	json = '"' + json + '"';

	var cmd = __dirname + "/lib/eggcupXlsParser.exe" +
		" -tpl " + tplPath +
		" -export " + expPath +
		" -json " + json;

	console.log(cmd);

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

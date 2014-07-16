/**
 * Created by 文远 on 13-11-12.
 */
module.exports = function (req, res) {
	"use strict";

	var exec = require('child_process').exec;
	var zlib = require('zlib');
	var cmd = 'mysqldump -uroot -proot eggcup';

	exec(cmd, {maxBuffer: 1024*1024*512} ,function (error, stdout, stderr) {

		if (stderr !== 'Warning: Using a password on the command line interface can be insecure.\r\n' && error !== null) {
			logger.error("Backup data failed." + ' Error msg:' + error + ' ' + stderr);
			res.statusCode = 400;
			res.end();
		} else {
			res.writeHead(200, {
				'Content-Type': "application/gzip"
			});
			zlib.gzip(stdout, function (_, result) {
				res.end(result);
			});
		}
	});
};
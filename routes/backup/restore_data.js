/**
 * Created by 文远 on 13-11-13.
 */
var child_process = require('child_process');
var zlib = require('zlib');
var path = require("path");
var fs = require('fs');

module.exports = function (req, res) {
	"use strict";

	//Get upload path
	var zipFile = path.resolve(__dirname, '../../uploads', req.body.restore_src);
	var dataSrc = path.resolve(__dirname, '../../uploads', './eggcup.sql');

	var out = fs.createWriteStream(dataSrc);
	var in_stream = fs.createReadStream(zipFile);

	in_stream.pipe(zlib.createUnzip()).pipe(out);

	var cmd = 'mysql -uroot -proot eggcup < ' + dataSrc;

	child_process.exec(cmd, {maxBuffer: 1024*1024*512}, function (error, stdout, stderr) {
		if (stderr !== 'Warning: Using a password on the command line interface can be insecure.\r\n' && error !== null) {
			logger.error("Restore data failed." + ' Error msg:' + error + ' ' + stderr);
			res.statusCode = 400;
			res.end();
		}
		else {
			res.statusCode = 200;
			res.end();
		}

		//Remove tmp files
		fs.unlinkSync(zipFile);
		fs.unlinkSync(dataSrc);
	});
};
/**
 * Created by 文远 on 13-11-13.
 */
module.exports = function (req, res) {
	"use strict";

	var child_process = require('child_process');
	var zlib = require('zlib');
	var fs = require('fs');

	//RSP file path and name
	var filePath = req.files.thumbnail.path;

	//Get upload path
	var pathbasearray = __dirname.split('\\');
	pathbasearray.pop();
	pathbasearray.pop();
	var path_base = pathbasearray.join('\\');
	var scriptFile = path_base + '\\uploads\\eggcup.sql';

	var out = fs.createWriteStream(scriptFile);
	var in_stream = fs.createReadStream(filePath);

	in_stream.pipe(zlib.createUnzip()).pipe(out);


	var cmd = 'mysql -uroot -proot eggcup < ' + scriptFile;

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
		fs.unlinkSync(scriptFile);
		fs.unlinkSync(filePath);
	});
};
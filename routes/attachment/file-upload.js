/**
 * Created by Bli on 2014/6/19.
 */
var path = require('path');
var fs = require('fs');

module.exports = function (req, res) {
	var file = req.files.files[0],
		fileName = file.path.split(path.dirname(file.path))[1].replace('\\', ''),
		o = {
			files: {
				file_name: file.name,
				file_url: fileName, //file.path.split(__dirname + '\\upload\\')[1].replace(/\\\\/g, '/'),
				file_size: file.size,
				file_ext: file.type
			}
		};

	res.json(o);

	var newDest = __dirname + '/../../attachments/' + fileName;
	fs.createReadStream(file.path).pipe(fs.createWriteStream(newDest));
};
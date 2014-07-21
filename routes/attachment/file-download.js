/**
 * Created by Bli on 2014/6/19.
 */
var path = require('path');

module.exports = function (req, res) {
	var file = req.params.fileUrl,
		filePath = path.normalize(__dirname + '/../../attachments/' + file);

	res.sendfile(filePath);
};
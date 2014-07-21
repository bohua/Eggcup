/**
 * Created by Bli on 2014/6/19.
 */
var path = require('path');

module.exports = function (req, res) {
	var file = req.params.fileUrl,
		givenName = req.query.givenName,
		filePath = path.normalize(__dirname + '/../../attachments/' + file);

	res.download(filePath, givenName);
};
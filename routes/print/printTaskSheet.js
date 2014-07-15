/**
 * Created by Bohua on 2014-07-06.
 */

var print_bo = require(__dirname + '/../../server/print/print_bo'),
	path = require('path');

module.exports = function (req, res) {
	var json = JSON.parse(req.params.printData);
	var printDocType = json.sheetType,
		dataModel = json.sheetData;

	print_bo.print(printDocType, dataModel).then(
		function (file) {
			var filePath = path.normalize(file),
				baseName = path.basename(filePath);
			if (file) {
				res.download(filePath, baseName);

			} else {
				res.statusCode = 200;
				res.contentType('json');
				res.json({
					code: 'ERR_PRINT_ERROR',
					reason: '打印失败'
				});
			}
		},
		function (failure) {
			res.statusCode = 400;
			res.json(failure);
		}
	);
};
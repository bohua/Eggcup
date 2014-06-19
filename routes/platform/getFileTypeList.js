/**
 * Created by Bli on 2014/6/19.
 */
var schemaReader = require('./readJsonSchema');
var schema = __dirname + "/../../schema/file-type-mapping-schma.json";

module.exports = function (req, res) {
	schemaReader(schema).then(
		function (success) {
			res.contentType('json');
			res.json(success);
		},
		function (failure) {
			res.statusCode = "400";
			res.end(failure.message);
		});
};
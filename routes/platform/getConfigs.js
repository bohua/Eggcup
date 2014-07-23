/**
 * Created by Bohua on 2014-07-23.
 */
var schemaReader = require('./readJsonSchema');
var schema = __dirname + "/../../config.json";

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
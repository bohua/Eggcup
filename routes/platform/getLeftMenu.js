/**
 * Created by Bli on 14-2-10.
 */
var schemaReader = require('./readJsonSchema');
var schema = __dirname + "/../../schema/left-menu-options-schema.json";

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
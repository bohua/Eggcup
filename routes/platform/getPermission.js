/**
 * Created by Bohua on 2014-06-23.
 */

var schemaReader = require('./readJsonSchema');
var schema = __dirname + "/../../schema/permission-map-schema.json";
var _ = require("lodash");

module.exports = function (req, res) {
	var permitLevel = req.query.userPermitLevel;

	schemaReader(schema).then(
		function (success) {
			var found = _.where(success, {level : [permitLevel]});

			res.contentType('json');
			res.json(found);
		},
		function (failure) {
			res.statusCode = "400";
			res.end(failure.message);
		});
};
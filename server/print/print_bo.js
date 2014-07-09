/**
 * Created by Bohua on 2014-07-06.
 */
var Q = require('q');
var _ = require('lodash');
var schemaReader = require(__dirname + '/../../routes/platform/readJsonSchema');
var xlsGenerator = require('./print-xls-generator');
var exportPath = __dirname + '/tmp/';

var templates = {
	register: {
		xls: __dirname + "/templates/register.tpl.xls",
		mapper: __dirname + "/templates/register.map.json",
		export_name: "打印登记表.xls"
	}
}

function createDataMapper(dataModel, mapper) {
	var result = {};

	_.forEach(dataModel, function (v, k) {
		var dataField = _.where(mapper, {data_field: k});
		if (!_.isEmpty(dataField)) {
			result[dataField[0]['cell']] = v;
		}
	});

	return result;
}

module.exports = {
	print: function (printDocType, dataModel) {
		var template = templates[printDocType],
			deferred = Q.defer();

		if (!template || !template.xls || !template.mapper) {
			deferred.reject('NO_TEMPLATE_FOUND');
			return deferred.promise;
		}

		exportPath += template.export_name;
		schemaReader(template.mapper).then(
			function (json) {
				var dataMapper = createDataMapper(dataModel, json);

				xlsGenerator(template.xls, exportPath, dataMapper).then(
					function () {
						deferred.resolve(exportPath);
					},
					function (failure) {
						deferred.reject({
							code: 'GENERATE_PRINT_DOC_FAIL',
							reason: failure
						});
					}
				);
			},
			function (failure) {
				deferred.reject({
					code: 'READ_TEMPLATE_FAIL',
					reason: failure
				});
				return deferred.promise;
			});

		return deferred.promise;
	}
};
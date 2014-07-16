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
		xls: __dirname + "/templates/登记表.tpl.xls",
		mapper: __dirname + "/templates/登记表_对照.map.json",
		export_name: "打印登记表.xls"
	},
	arrange: {
		xls: __dirname + "/templates/审核表.tpl.xls",
		mapper: __dirname + "/templates/审核表_对照.map.json",
		export_name: "打印审核表.xls"
	},
	contract: {
		xls: __dirname + "/templates/合同表.tpl.xls",
		mapper: __dirname + "/templates/合同表_对照.map.json",
		export_name: "打印合同表.xls"
	}
}

function createDataMapper(dataModel, mapper) {
	var result = {};

	if (dataModel.singleMapper) {
		_.forEach(dataModel.singleMapper, function (v, k) {
			var dataField = _.where(mapper.singleMapper, {data_field: k});
			if (!_.isEmpty(dataField)) {
				if (!result.singleMapper) {
					result.singleMapper = {};
				}
				result.singleMapper[dataField[0]['cell']] = v;
			}
		});
	}

	if (dataModel.rowMapper && mapper.rowMapper) {
		_.forEach(dataModel.rowMapper.rowData, function (row) {
			var newRow = {};

			_.forEach(row, function (v, k) {
				var dataField = _.where(mapper.rowMapper.rowData, {data_field: k});
				if (!_.isEmpty(dataField)) {
					newRow[dataField[0]['cell']] = v;
				}
			});

			if (!result.rowMapper) {
				result.rowMapper = {
					startRow: mapper.rowMapper.startRow,
					rowData: []
				};
			}

			result.rowMapper.rowData.push(newRow);
		});
	}

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

		schemaReader(template.mapper).then(
			function (json) {
				var dataMapper = createDataMapper(dataModel, json);
				var expPath = exportPath + template.export_name;

				xlsGenerator(template.xls, expPath, dataMapper).then(
					function () {
						deferred.resolve(expPath);
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
/**
 * Created by Bli on 2014/5/21.
 */
var Q = require("q");
var Bo = require(__dirname+ "/../abstract_bo");

var EMPLOYEE_LIST_MAPPER = new Bo('MAP_EMPLOYEE_LIST',{
	name: 'getEmployeeList',
	method: function(list_id){
		var deferred = Q.defer();

		this.orm.model(this._table).findAll({
			where:{
				list_id : list_id
			}
		});

		return deferred.promise;
	}
});

module.exports = EMPLOYEE_LIST_MAPPER;
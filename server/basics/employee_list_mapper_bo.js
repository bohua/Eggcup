/**
 * Created by Bli on 2014/5/21.
 */
var Bo = require(__dirname+ "/../abstract_bo");

var EMPLOYEE_LIST_MAPPER = new Bo('MAP_EMPLOYEE_LIST',{
	name: 'getEmployeeList',
	method: function(list_id){
		var deferred = Q.defer();


	}
});

module.exports = EMPLOYEE_LIST_MAPPER;
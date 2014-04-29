/**
 * Created by Bohua on 2014-04-28.
 */

/**
 * Customer Resource routes
 */
module.exports.getCustomer = require('./Customer/getCustomer.js');
module.exports.getCustomerList = require('./Customer/getCustomerList.js');
module.exports.setCustomer = require('./Customer/setCustomer.js');
//module.exports.addCustomer = require('./Customer/addCustomer.js');

/**
 * Employee Resource routes
 */
module.exports.getEmployee = require('./getEmployee.js');
module.exports.getEmployeeList = require('./getEmployeeList.js');
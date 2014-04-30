/**
 * Created by Bohua on 2014-04-28.
 */

/**
 * Customer Resource routes
 */
module.exports.getCustomer = require('./Customer/getCustomer');
module.exports.getCustomerList = require('./Customer/getCustomerList');
module.exports.setCustomer = require('./Customer/setCustomer');
module.exports.addCustomer = require('./Customer/addCustomer');
module.exports.delCustomer = require('./Customer/delCustomer');

/**
 * Employee Resource routes
 */
module.exports.getEmployee = require('./Employee/getEmployee');
module.exports.getEmployeeList = require('./Employee/getEmployeeList');
module.exports.setEmployee = require('./Employee/setEmployee');
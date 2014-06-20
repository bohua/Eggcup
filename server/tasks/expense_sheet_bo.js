/**
 * Created by bli on 2014/6/2.
 */
var SheetBo = require(__dirname+"/../abstract_sheet_bo");

var EXPENSE_SHEET = new SheetBo('DATA_EXPENSE', 'DATA_EXPENSE_SUB');

module.exports = EXPENSE_SHEET;
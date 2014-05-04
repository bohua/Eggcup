/**
 * Created by Bohua on 2014-05-03.
 */

var bo = require(__dirname + '/../../../server/basics/tag_bo');

module.exports = function (tagsInString) {
	return bo.translate(tagsInString);
};
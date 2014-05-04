/**
 * Created by Bohua on 2014-05-03.
 */

function retreiveDataValues(seqObject){
	var pureObject = {};
	var tmp;
	for(var i in seqObject.dataValues){
		tmp = seqObject.dataValues[i];
		if(typeof(tmp) !== "function"){
			pureObject[i] = tmp;
		}
	}

	return pureObject;
}

module.exports = {
	retreiveDataValues: retreiveDataValues
};
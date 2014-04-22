/**
 * Created by Bli on 2014/4/7.
 */
module.exports = function (req, res) {
	var rsda_id = req.params.rsda_id;

	global.db.RSDA_MASTER.find({
		where: {
			id: rsda_id
		}
	}).complete(function(err, result){
		if(!!err){
			global.exception_handler(err).then(function(err_code){
				res.statusCode = "400";
				res.contentType('json');
				res.end({
					message: err.message,
					code: err_code
				});
			});
			return;
		}

		if(!result){
			res.statusCode = "400";
			res.contentType('json');
			res.end({});
			return;
		}

		res.statusCode = "200";
		res.contentType('json');
		res.end(result.values);
	});
}
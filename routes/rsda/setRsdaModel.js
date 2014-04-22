/**
 * Created by Bli on 2014/4/7.
 */
module.exports = function (req, res) {
	var RsdaModel = global.db.RSDA_MASTER;

	RsdaModel.create(req.body).success(function(rsda){
		res.contentType('json');
		res.json({
			save_success: true,
			model: rsda
		});
	});
}
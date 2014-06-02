/**
 * Created by Bohua on 2014-06-01.
 */
var Bo = require(__dirname+ "/../abstract_bo");
var attachment_bo = require(__dirname+ "/attachment_bo");

function saveAttachment(attachment, reply_instance){
	attachment_bo.save(attachment)
		.then(function(attach_instance){
			reply_instance.addAttachment(attach_instance);
		});
}

var SHEET = function(schema){
	var sheet_bo = new Bo( schema, {
		name: 'save',
		method: function(model){
			var save_handler = this._save(model);

			save_handler.then(function(reply_instance){
				if(model.attachment){
					for(var i in model.attachment){
						saveAttachment(model.attachment[i], reply_instance);
					}
				}
			});

			return save_handler;
		}
	});

	return sheet_bo;
}

module.exports = SHEET;
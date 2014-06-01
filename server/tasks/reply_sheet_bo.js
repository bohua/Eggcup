/**
 * Created by Bohua on 2014-06-01.
 */
var Bo = require(__dirname+ "/../abstract_bo");
var attachment_bo = require(__dirname+ "/attachment_bo");
var Q = require("q");

function saveAttachment(attachment, reply_instance){
	attachment_bo.save(attachment)
		.then(function(attach_instance){
			reply_instance.addReplyAttach(attach_instance);
		});
}

var REPLY_SHEET = new Bo('DATA_REPLY', {
	name: 'save',
	method: function(model){
		var save_handler = this._save(model);

		save_handler.then(function(reply_instance){
			if(model.replyAttach){
				for(var attachment in model.replyAttach){
					saveAttachment(model.replyAttach[attachment], reply_instance);
				}
			}
		});

		return save_handler;
	}
});

module.exports = REPLY_SHEET;
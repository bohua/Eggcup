/**
 * Created by Bohua on 2014-06-01.
 */
var Bo = require(__dirname + "/abstract_bo");
var attachment_handler = require(__dirname + "/tasks/attachment_bo");

var SHEET = function (schema, sub_item_handler) {
	var sheet_bo = new Bo(schema, {
		name: 'save',
		method: function (model) {
			var save_handler = this._save(model);

			save_handler.then(function (sheet_instance) {

				//Save attachments
				if (model.attachment && sheet_instance.addAttachment) {
					for (var i in model.attachment) {
						attachment_handler.save(model.attachment[i])
							.then(
							function (attach_instance) {
								sheet_instance.addAttachment(attach_instance);
							},
							function (error) {
								global.logger.error(error);
							}
						);
					}
				}

				//Save sub items
				if (sub_item_handler && model.subItem && sheet_instance.addSubItem) {
					for (var i in model.subItem) {
						new SHEET(sub_item_handler).save(model.subItem[i])
							.then(
							function (sub_item_instance) {
								sheet_instance.addSubItem(sub_item_instance);
							},
							function (error) {
								global.logger.error(error);
							});

					}
				}
			});

			return save_handler;
		}
	});

	return sheet_bo;
}

module.exports = SHEET;
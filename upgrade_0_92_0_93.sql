DELIMITER $$
DROP PROCEDURE IF EXISTS upgrade_database_0_92_0_93 $$
CREATE PROCEDURE upgrade_database_0_92_0_93()
BEGIN

IF EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='DATAACCOUNTSUBId' AND TABLE_NAME='ref_attachments') ) THEN
    ALTER TABLE eggcup.ref_attachments CHANGE COLUMN DATAACCOUNTSUBId account_sub_id INT(11) NULL DEFAULT NULL ;
END IF;
IF EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='DATA_ACCOUNT_SUB_Id' AND TABLE_NAME='ref_attachments') ) THEN
    ALTER TABLE eggcup.ref_attachments CHANGE COLUMN DATA_ACCOUNT_SUB_Id account_sub_id INT(11) NULL DEFAULT NULL ;
END IF;


IF EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='DATACONTRACTSUBId' AND TABLE_NAME='ref_attachments') ) THEN
    ALTER TABLE eggcup.ref_attachments CHANGE COLUMN DATACONTRACTSUBId contract_sub_id INT(11) NULL DEFAULT NULL ;
END IF;
IF EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='DATA_CONTRACT_SUB_Id' AND TABLE_NAME='ref_attachments') ) THEN
    ALTER TABLE eggcup.ref_attachments CHANGE COLUMN DATA_CONTRACT_SUB_Id contract_sub_id INT(11) NULL DEFAULT NULL ;
END IF;

IF EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='DATAEXECUTESUBId' AND TABLE_NAME='ref_attachments') ) THEN
    ALTER TABLE eggcup.ref_attachments CHANGE COLUMN DATAEXECUTESUBId execute_sub_id INT(11) NULL DEFAULT NULL ;
END IF;
IF EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='DATA_EXECUTE_SUB_Id' AND TABLE_NAME='ref_attachments') ) THEN
    ALTER TABLE eggcup.ref_attachments CHANGE COLUMN DATA_EXECUTE_SUB_Id execute_sub_id INT(11) NULL DEFAULT NULL ;
END IF;

IF EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='DATAPROPOSALSUBId' AND TABLE_NAME='ref_attachments') ) THEN
    ALTER TABLE eggcup.ref_attachments CHANGE COLUMN DATAPROPOSALSUBId proposal_sub_id INT(11) NULL DEFAULT NULL ;
END IF;
IF EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='DATA_PROPOSAL_SUB_Id' AND TABLE_NAME='ref_attachments') ) THEN
    ALTER TABLE eggcup.ref_attachments CHANGE COLUMN DATA_PROPOSAL_SUB_Id proposal_sub_id INT(11) NULL DEFAULT NULL ;
END IF;

IF EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='DATAREPLYId' AND TABLE_NAME='ref_attachments') ) THEN
    ALTER TABLE eggcup.ref_attachments CHANGE COLUMN DATAREPLYId reply_id INT(11) NULL DEFAULT NULL ;
END IF;
IF EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='DATA_REPLY_Id' AND TABLE_NAME='ref_attachments') ) THEN
    ALTER TABLE eggcup.ref_attachments CHANGE COLUMN DATA_REPLY_Id reply_id INT(11) NULL DEFAULT NULL ;
END IF;

IF EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='DATAEXPENSESUBId' AND TABLE_NAME='ref_attachments') ) THEN
    ALTER TABLE eggcup.ref_attachments CHANGE COLUMN DATAEXPENSESUBId expense_sub_id INT(11) NULL DEFAULT NULL ;
END IF;
IF EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='DATA_EXPENSE_SUB_Id' AND TABLE_NAME='ref_attachments') ) THEN
    ALTER TABLE eggcup.ref_attachments CHANGE COLUMN DATA_EXPENSE_SUB_Id expense_sub_id INT(11) NULL DEFAULT NULL ;
END IF;


IF NOT EXISTS( (SELECT * FROM information_schema.TABLES WHERE TABLE_SCHEMA='eggcup'
        AND TABLE_NAME='data_reply_subs') ) THEN
    CREATE TABLE data_reply_subs (
      id int(11) NOT NULL AUTO_INCREMENT,
      reply_withEmail tinyint(1) DEFAULT '0',
      reply_withTel tinyint(1) DEFAULT '0',
      reply_withF2F tinyint(1) DEFAULT '0',
      reply_withFax tinyint(1) DEFAULT '0',
      reply_date datetime DEFAULT NULL,
      consult_person varchar(255) DEFAULT NULL,
      reply_person varchar(255) DEFAULT NULL,
      translate_person varchar(255) DEFAULT NULL,
      meeting_address varchar(255) DEFAULT NULL,
      meeting_people_A varchar(255) DEFAULT NULL,
      meeting_people_B varchar(255) DEFAULT NULL,
      consult_context text,
      reply_context text,
      law_context text,
      createdAt datetime NOT NULL,
      updatedAt datetime NOT NULL,
      reply_id int(11) DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

    INSERT INTO data_reply_subs (
        reply_withEmail,
        reply_withTel,
        reply_withF2F,
        reply_withFax,
        reply_date,
        consult_person,
        translate_person,
        meeting_address,
        meeting_people_A,
        meeting_people_B,
        consult_context,
        reply_context,
        law_context,
        createdAt,
        updatedAt,
        reply_id
    ) SELECT reply_withEmail,
             reply_withTel,
             reply_withF2F,
             reply_withFax,
             reply_date,
             consult_person,
             translate_person,
             meeting_address,
             meeting_people_A,
             meeting_people_B,
             consult_context,
             reply_context,
             law_context,
             createdAt,
             updatedAt,
             id
      FROM data_replies;

END IF;


IF EXISTS((SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='reply_id' AND TABLE_NAME='ref_attachments'))
	AND NOT EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='reply_sub_id' AND TABLE_NAME='ref_attachments') ) THEN

	ALTER TABLE ref_attachments ADD COLUMN reply_sub_id INT(11) NULL;

	UPDATE ref_attachments
	JOIN
		data_reply_subs
	ON
		ref_attachments.reply_id = data_reply_subs.reply_id

	SET ref_attachments.reply_sub_id = data_reply_subs.id
	WHERE
		 data_reply_subs.reply_id IS NOT NULL;

END IF;

IF NOT EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='contract_D' AND TABLE_NAME='data_contracts') ) THEN
    ALTER TABLE data_contracts ADD COLUMN contract_D VARCHAR(255) NULL DEFAULT NULL AFTER contract_B;
END IF;

IF NOT EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='contract_C' AND TABLE_NAME='data_contracts') ) THEN
    ALTER TABLE data_contracts ADD COLUMN contract_C VARCHAR(255) NULL DEFAULT NULL AFTER contract_B;
END IF;

END $$
CALL upgrade_database_0_92_0_93() $$

DELIMITER ;
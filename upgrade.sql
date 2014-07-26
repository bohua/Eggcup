DELIMITER $$

DROP PROCEDURE IF EXISTS upgrade_database $$
CREATE PROCEDURE upgrade_database()
BEGIN

IF NOT EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='contract_price' AND TABLE_NAME='data_contracts') ) THEN
    ALTER TABLE data_contracts ADD COLUMN contract_price DECIMAL(16,2) NULL DEFAULT 0.00 AFTER contract_topic;
END IF;

IF NOT EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='aborted' AND TABLE_NAME='data_tasks') ) THEN
    ALTER TABLE data_tasks ADD COLUMN aborted tinyint(1) DEFAULT 0 AFTER id;
END IF;

IF NOT EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='abort_date' AND TABLE_NAME='data_tasks') ) THEN
    ALTER TABLE data_tasks ADD COLUMN abort_date datetime AFTER id;
END IF;

IF NOT EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='abort_person' AND TABLE_NAME='data_tasks') ) THEN
    ALTER TABLE data_tasks ADD COLUMN abort_person varchar(255) DEFAULT NULL AFTER id;
END IF;

IF NOT EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='abort_reason' AND TABLE_NAME='data_tasks') ) THEN
    ALTER TABLE data_tasks ADD COLUMN abort_reason varchar(255) DEFAULT NULL AFTER id;
END IF;

END $$

CALL upgrade_database() $$

DELIMITER ;
DELIMITER $$
DROP PROCEDURE IF EXISTS upgrade_database_0_91_0_92 $$
CREATE PROCEDURE upgrade_database_0_91_0_92()
BEGIN

IF NOT EXISTS( (SELECT * FROM information_schema.TABLES WHERE TABLE_SCHEMA='eggcup'
        AND TABLE_NAME='ref_customer_contacts') ) THEN
    CREATE TABLE ref_customer_contacts (
      id int(11) NOT NULL AUTO_INCREMENT,
      contact varchar(255) DEFAULT NULL,
      tel varchar(255) DEFAULT NULL,
      email varchar(255) DEFAULT NULL,
      createdAt datetime NOT NULL,
      updatedAt datetime NOT NULL,
      customer_id int(11) DEFAULT NULL,
      PRIMARY KEY (id),
      KEY customer_id (customer_id),
      CONSTRAINT ref_customer_contacts_ibfk_1 FOREIGN KEY (customer_id) REFERENCES ref_customers (id) ON DELETE SET NULL ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

	INSERT INTO ref_customer_contacts (contact, tel, email, createdAt, updatedAt, customer_id) SELECT contact, tel, email, createdAt, updatedAt, id FROM ref_customers;
END IF;

IF NOT EXISTS( (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='eggcup'
        AND COLUMN_NAME='consult_date' AND TABLE_NAME='data_tasks') ) THEN
    ALTER TABLE data_tasks ADD COLUMN consult_date datetime AFTER report_date;

	UPDATE data_tasks SET consult_date=report_date;
END IF;

END $$
CALL upgrade_database_0_91_0_92() $$

DELIMITER ;
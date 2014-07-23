mysql -uroot -proot eggcup -e "ALTER TABLE `eggcup`.`data_contracts` ADD COLUMN `contract_price` DECIMAL(16,2) NULL DEFAULT 0.00 AFTER `task_id`;"

pause
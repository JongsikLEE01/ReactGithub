CREATE TABLE `todo` (
  `no` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `status` int DEFAULT '0',
  `reg_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `upd_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`no`)
) COMMENT='할일';

-- 샘플 데이터
INSERT INTO todo(name, status)
VALUES
('todo01', 1),
('todo02', 1),
('todo03', 1),
('todo04', 0),
('todo05', 0),
('todo06', 0),
('todo07', 0),
('todo08', 0),
('todo09', 0),
('todo10', 0)
;
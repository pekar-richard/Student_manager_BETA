DROP SCHEMA IF EXISTS `student_manager`;
CREATE DATABASE  IF NOT EXISTS `student_manager`;
USE `student_manager`;

DROP TABLE IF EXISTS `agentur`;
CREATE TABLE `agentur` (
	`agentur_index` int(11) NOT NULL AUTO_INCREMENT,
	`agentur_kurzname` varchar(50) NOT NULL,
	`agentur_komm` varchar(50)  NULL,
	`created_at` DATETIME  NULL,
	`updated_at` DATETIME  NULL,
  PRIMARY KEY (`agentur_index`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

INSERT INTO `agentur` VALUES 
(1,'Eigene','Piestany ','2018-06-16','2018-08-12'),
(2,'Sch','Zilina','2015-05-11','2016-07-01'),
(3,'CM','Bratislava','2015-01-02','2018-05-15'),
(4,'Val','Trnava','2017-12-22','2019-05-12');

DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
	`student_index` int(11) NOT NULL AUTO_INCREMENT,
	`student_nachname` varchar(50) NOT NULL,
	`student_vorname` varchar(50)  NOT NULL,
	`student_sortierung` varchar(50) NOT NULL,
	`student_kredit` DECIMAL(10,2)  NOT NULL,
	`student_gebdat` DATE  NULL,
	`student_ersttermin` DATETIME NULL,
	`student_letztermin` DATETIME NULL,
	`student_preis45`  DECIMAL(10,2)  NOT NULL,
	`student_preis60`  DECIMAL(10,2)  NOT NULL,
	`student_preis90`  DECIMAL(10,2)  NOT NULL,
	`student_preis120` DECIMAL(10,2)  NOT NULL,
	`student_abrechnung` int(11)  NOT NULL,
	`student_aktiv` int(11)  NOT NULL,
	`student_quelle` varchar(50)  NULL,
	`student_komm` varchar(50)  NULL,
	`created_at` DATETIME NULL,
	`updated_at` DATETIME NULL,
    `student_agentur` int(11)  NULL,
	PRIMARY KEY (`student_index`),
	KEY `FK_DETAIL1_idx` (`student_agentur`),
	CONSTRAINT `FK_DETAIL1` FOREIGN KEY (`student_agentur`) REFERENCES `agentur` (`agentur_index`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

INSERT INTO `student` VALUES
(1,'Pekar','Richard','Pekar, Richard',25,'1987-05-12',null,null,15,25,0,0,1,1,'DoucMa','Niveau A','2018-06-11','2020-06-12',1),
(2,'Pekar','Andrej','Pekar, Andrej',25,'1987-08-25',null,null,15,25,0,0,1,1,'Sch','Niveau A','2018-06-11','2020-12-07',2),
(3,'Pekar','Matúš','Pekar, Matúš',25,'1989-06-01',null,null,15,25,0,0,2,1,'CM','Niveau B','2017-06-11','2020-05-05',3),
(4,'Pekar','Milan','Pekar, Milan',25,'1990-12-15',null,null,15,25,0,0,3,2,'Val','Niveau C','2015-06-11','2020-09-22',4);

DROP TABLE IF EXISTS `lektion`;
CREATE TABLE `lektion` (
	`lektion_index` int(11) NOT NULL AUTO_INCREMENT,
	`lektion_datum` DATETIME  NULL,
    `lektion_min` int(11)  NOT NULL,
    `lektion_preis`  DECIMAL(10,2)  NOT NULL,
	`lektion_art` int(11)  NULL,
	`lektion_status` int(11)  NULL,
	`created_at` DATETIME  NULL,
	`updated_at` DATETIME  NULL,
	`lektion_agentur` int(11)  NULL,
	`lektion_student` int(11)  NULL,
	PRIMARY KEY (`lektion_index`),
	KEY `FK_DETAIL2_idx` (`lektion_agentur`),
	CONSTRAINT `FK_DETAIL2` FOREIGN KEY (`lektion_agentur`) REFERENCES `agentur` (`agentur_index`),
	KEY `FK_DETAIL3_idx` (`lektion_student`),
	CONSTRAINT `FK_DETAIL3` FOREIGN KEY (`lektion_student`) REFERENCES `student` (`student_index`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

INSERT INTO `lektion` VALUES 
(1,'2019-08-01 14:00:00',60,25,1,1,'2014-12-17','2020-06-11',1,1),
(2,'2019-08-01 15:00:00',60,25,1,1,'2014-12-17','2020-06-11',2,2),
(3,'2019-08-02 16:00:00',60,25,0,1,'2018-03-22','2020-06-11',3,3),
(4,'2018-08-03 17:00:00',60,25,1,2,'2015-07-12','2020-06-11',4,4);

DROP TABLE IF EXISTS `zahlung`;
CREATE TABLE `zahlung` (
	`zahlung_index` int(11) NOT NULL AUTO_INCREMENT,
	`zahlung_datum` DATE NOT NULL,
	`zahlung_betrag`  DECIMAL(10,2)  NOT NULL,
	`zahlung_konto` varchar(50)  NOT NULL,
	`zahlung_steuer` int(11)   NULL,
	`zahlung_rgnr` int(11) NOT NULL,
	`zahlung_komm` varchar(50)  NULL,
    `zahlung_abrechnung`  int(11) NOT NULL,
	`created_at` DATETIME  NULL,
	`updated_at` DATETIME  NULL,
	`zahlung_student` int(11)  NULL,
    `zahlung_lektion` int(11)  NULL,
	`zahlung_agentur` int(11)  NULL,
	PRIMARY KEY (`zahlung_index`),
	KEY `FK_DETAIL4_idx` (`zahlung_student`),
	CONSTRAINT `FK_DETAIL4` FOREIGN KEY (`zahlung_student`) REFERENCES `student` (`student_index`),
	KEY `FK_DETAIL10_idx` (`zahlung_lektion`),
	CONSTRAINT `FK_DETAIL10` FOREIGN KEY (`zahlung_lektion`) REFERENCES `lektion` (`lektion_index`),
	KEY `FK_DETAIL12_idx` (`zahlung_agentur`),
	CONSTRAINT `FK_DETAIL12` FOREIGN KEY (`zahlung_agentur`) REFERENCES `agentur` (`agentur_index`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

INSERT INTO `zahlung` VALUES 
(1,'2019-08-01',-25,'',0,0,'Lektionsabrechnung',0,'2020-12-11','2020-12-11',1,1,1),
(2,'2019-08-01',-25,'',0,0,'Lektionsabrechnung',0,'2020-12-11','2020-12-11',2,2,2),
(3,'2019-08-02',-25,'',0,0,'Lektionsabrechnung',0,'2020-12-11','2020-12-11',3,3,3),
(4,'2018-08-03',-25,'',0,0,'Lektionsabrechnung',0,'2020-12-11','2020-12-11',4,4,4),
(5,'2019-08-01',50,'',0,0,'bezahlt',1,'2020-12-11','2020-12-11',1,null,1),
(6,'2019-08-01',50,'',0,0,'bezahlt',1,'2020-12-11','2020-12-11',2,null,2),
(7,'2019-08-02',50,'',0,0,'bezahlt',2,'2020-12-11','2020-12-11',3,null,3),
(8,'2018-08-03',50,'',0,20170006,'',3,'2020-12-11','2020-12-11',4,null,4);

DROP TABLE IF EXISTS `rechnung`;
CREATE TABLE `rechnung` (
	`rechn_index` int(11) NOT NULL AUTO_INCREMENT,
	`rechn_typ` int(11)  NULL,
    `rechn_name` varchar(50)  NOT NULL,
	`rechn_zusatz` varchar(50)  NOT NULL,
    `rechn_str` varchar(50)  NOT NULL,
	`rechn_plz` varchar(50)  NOT NULL,
	`rechn_ort` varchar(50)  NOT NULL,
	`rechn_land` varchar(50)  NOT NULL,
	`rechn_ico` int(11) NOT NULL,
	`rechn_dic` int(11) NOT NULL,
	`created_at` DATETIME  NULL,
	`updated_at` DATETIME  NULL,
	`rechn_agentur` int(11)  NULL,
	`rechn_student` int(11)  NULL,
	PRIMARY KEY (`rechn_index`),
	KEY `FK_DETAIL5_idx` (`rechn_agentur`),
	CONSTRAINT `FK_DETAIL5` FOREIGN KEY (`rechn_agentur`) REFERENCES `agentur` (`agentur_index`),
	KEY `FK_DETAIL6_idx` (`rechn_student`),
	CONSTRAINT `FK_DETAIL6` FOREIGN KEY (`rechn_student`) REFERENCES `student` (`student_index`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8;

INSERT INTO `rechnung` VALUES 
(1,0,'Pekar, Milan','','Trnavske myto','91921','Bratislava','Slowakia','12345679','1080804252','2020-06-11','2020-06-11',4,4);

    DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` char(68) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `users` 
VALUES 
('Richard','{bcrypt}$2y$12$1wLeNL.zwjXnNv9QgshA2.qaobwYdPQwbrYnH1/UUl.gP5f9upvOu',1),
('Stefan','{bcrypt}$2y$12$1wLeNL.zwjXnNv9QgshA2.qaobwYdPQwbrYnH1/UUl.gP5f9upvOu',1),
('Jaroslav','{bcrypt}$2y$12$1wLeNL.zwjXnNv9QgshA2.qaobwYdPQwbrYnH1/UUl.gP5f9upvOu',1);

DROP TABLE IF EXISTS `authorities`;
CREATE TABLE `authorities` (
  `username` varchar(50) NOT NULL,
  `authority` varchar(50) NOT NULL,
  UNIQUE KEY `authorities_idx_1` (`username`,`authority`),
  CONSTRAINT `authorities_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `authorities`
--
INSERT INTO `authorities` 
VALUES 
('Richard','ROLE_USER'),
('Stefan','ROLE_USER'),
('Jaroslav','ROLE_USER');
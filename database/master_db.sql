# ************************************************************
# Sequel Ace SQL dump
# Version 20051
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 127.0.0.1 (MySQL 8.1.0)
# Database: car_rent
# Generation Time: 2023-12-13 07:50:53 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table car_favorites
# ------------------------------------------------------------

DROP TABLE IF EXISTS `car_favorites`;

CREATE TABLE `car_favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `car_id` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `car_favorites` WRITE;
/*!40000 ALTER TABLE `car_favorites` DISABLE KEYS */;

INSERT INTO `car_favorites` (`id`, `user_id`, `car_id`, `created_at`, `updated_at`, `deleted_at`)
VALUES
	(27,2,1,'2023-05-02 22:56:31.941370','2023-05-02 22:56:31.941370',NULL),
	(28,60,1,'2023-05-03 19:00:09.356497','2023-05-03 19:00:09.356497',NULL);

/*!40000 ALTER TABLE `car_favorites` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table car_image
# ------------------------------------------------------------

DROP TABLE IF EXISTS `car_image`;

CREATE TABLE `car_image` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `car_id` int DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `car_image` WRITE;
/*!40000 ALTER TABLE `car_image` DISABLE KEYS */;

INSERT INTO `car_image` (`created_at`, `updated_at`, `deleted_at`, `id`, `car_id`, `path`)
VALUES
	('2023-01-08 13:57:19.198733','2023-02-05 22:32:46.052555',NULL,1,1,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-01-08 13:57:19.200334','2023-02-05 22:32:46.053368',NULL,2,1,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-01-08 13:57:19.200836','2023-02-05 22:32:46.053742',NULL,3,1,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-01-08 13:57:19.201231','2023-02-05 22:32:46.054050',NULL,4,1,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-01-08 13:57:19.201705','2023-02-05 22:32:46.054364',NULL,5,2,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-01-08 13:57:19.202080','2023-02-05 22:32:46.054963',NULL,6,2,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-01-08 13:57:19.202378','2023-02-05 22:32:46.054610',NULL,7,2,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,8,3,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,9,3,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,10,3,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,11,4,'https://gtsh-rank.com/images/cars/aa1619014eca7646d9198bf255dcc80c-7179337.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,12,4,'https://gtsh-rank.com/images/cars/aa1619014eca7646d9198bf255dcc80c-7179337.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,13,4,'https://gtsh-rank.com/images/cars/aa1619014eca7646d9198bf255dcc80c-7179337.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,14,5,'https://www.fastercars.ae/wp-content/themes/grandcarrental/img/Luxury-new.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,15,5,'https://www.fastercars.ae/wp-content/themes/grandcarrental/img/Luxury-new.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,16,5,'https://www.fastercars.ae/wp-content/themes/grandcarrental/img/Luxury-new.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,17,6,'https://images.ctfassets.net/uwf0n1j71a7j/224hK7Ficdt3VjetwwgO38/4aa71f110d866229b47cee15c8d0f7f4/hyundai-car-insurance.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,18,6,'https://images.ctfassets.net/uwf0n1j71a7j/224hK7Ficdt3VjetwwgO38/4aa71f110d866229b47cee15c8d0f7f4/hyundai-car-insurance.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,19,6,'https://images.ctfassets.net/uwf0n1j71a7j/224hK7Ficdt3VjetwwgO38/4aa71f110d866229b47cee15c8d0f7f4/hyundai-car-insurance.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,20,7,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_190SL_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,21,7,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_190SL_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,22,7,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_190SL_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,23,8,'https://images.ctfassets.net/uwf0n1j71a7j/2IY5A03z0BImzdfS5b6Hoc/055d80af47c139d31c3c1283a3f7623a/mg-motors-car-insurance.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,24,8,'https://images.ctfassets.net/uwf0n1j71a7j/2IY5A03z0BImzdfS5b6Hoc/055d80af47c139d31c3c1283a3f7623a/mg-motors-car-insurance.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,25,8,'https://images.ctfassets.net/uwf0n1j71a7j/2IY5A03z0BImzdfS5b6Hoc/055d80af47c139d31c3c1283a3f7623a/mg-motors-car-insurance.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,26,9,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,27,9,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,28,9,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,29,10,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,30,10,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,31,10,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,32,11,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,33,11,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,34,11,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,35,13,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,36,13,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,37,13,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,38,14,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,39,14,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,40,14,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,41,15,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,42,15,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,43,15,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,44,16,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,45,16,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,46,16,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,47,17,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,48,17,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,49,17,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,50,18,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,51,18,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,52,18,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,53,19,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,54,19,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,55,19,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,56,20,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,57,20,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,58,20,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,59,21,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,60,21,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,61,21,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,62,22,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,63,22,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,64,22,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,65,23,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,66,23,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,67,23,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,68,24,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,69,24,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,70,24,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,71,25,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,72,25,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,73,26,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,74,26,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,75,26,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,76,27,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,77,27,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,78,27,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,79,28,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,80,28,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,81,28,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,82,29,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,83,29,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,84,29,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,85,30,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,86,30,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg'),
	('2023-02-05 22:31:31.263453','2023-02-05 22:31:31.263453',NULL,87,30,'https://cdn.hertz-classics.at/wp-content/uploads/2020/10/Hertz-Classics-Mercedes_Benz_220SEb_BE.svg');

/*!40000 ALTER TABLE `car_image` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table car_locations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `car_locations`;

CREATE TABLE `car_locations` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `car_id` int DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `name` enum('pick_up','drop_off') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `car_locations` WRITE;
/*!40000 ALTER TABLE `car_locations` DISABLE KEYS */;

INSERT INTO `car_locations` (`created_at`, `updated_at`, `deleted_at`, `id`, `car_id`, `city_id`, `name`)
VALUES
	('2023-01-08 10:01:08.560016','2023-04-20 14:15:39.909778',NULL,1,12,1,'pick_up'),
	('2023-01-08 10:01:08.560016','2023-04-25 11:06:20.846808',NULL,2,1,1,'pick_up'),
	('2023-01-08 10:01:08.560016','2023-04-20 14:16:41.607647',NULL,3,13,3,'pick_up'),
	('2023-01-08 10:01:08.560016','2023-04-20 14:16:41.608171',NULL,4,15,1,'drop_off'),
	('2023-01-08 10:01:08.560016','2023-04-20 14:16:41.607022',NULL,5,11,2,'drop_off'),
	('2023-01-08 10:01:08.560016','2023-01-08 10:01:08.560016',NULL,6,2,4,'drop_off'),
	('2023-01-08 10:01:08.560016','2023-01-08 10:01:08.560016',NULL,7,2,4,'pick_up'),
	('2023-01-08 10:01:08.560016','2023-01-11 21:41:45.366457',NULL,8,2,1,'pick_up'),
	('2023-01-08 10:01:08.560016','2023-01-11 21:41:45.359299',NULL,9,2,1,'drop_off'),
	('2023-01-08 10:01:08.560016','2023-01-08 10:01:08.560016',NULL,10,2,6,'pick_up'),
	('2023-01-08 10:01:08.560016','2023-01-08 10:01:08.560016',NULL,11,2,6,'drop_off'),
	('2023-01-08 10:01:08.560016','2023-01-08 10:01:08.560016',NULL,12,3,7,'drop_off'),
	('2023-01-08 10:01:08.560016','2023-01-08 10:01:08.560016',NULL,13,3,8,'drop_off'),
	('2023-01-08 10:01:08.560016','2023-01-08 10:01:08.560016',NULL,14,3,7,'pick_up'),
	('2023-01-08 10:01:08.560016','2023-01-08 10:01:08.560016',NULL,15,3,8,'pick_up'),
	('2023-01-08 10:01:08.560016','2023-01-08 10:01:08.560016',NULL,16,4,9,'drop_off'),
	('2023-01-08 10:01:08.560016','2023-01-08 10:01:08.560016',NULL,17,4,9,'pick_up'),
	('2023-01-08 10:01:08.560016','2023-01-11 21:41:45.369229',NULL,18,4,1,'drop_off'),
	('2023-01-08 10:01:08.560016','2023-01-11 21:41:45.367823',NULL,19,4,1,'pick_up'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,20,1,5,'pick_up'),
	('2023-02-05 22:40:06.351414','2023-04-25 11:06:20.849335',NULL,21,1,1,'drop_off'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,22,1,6,'pick_up'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,23,1,6,'drop_off'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,24,1,7,'pick_up'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,25,1,7,'drop_off'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,26,1,8,'pick_up'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,27,1,8,'drop_off'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,28,2,5,'pick_up'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,29,2,5,'drop_off'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,30,2,7,'pick_up'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,31,2,7,'drop_off'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,32,2,8,'pick_up'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,33,2,8,'drop_off'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,34,2,9,'pick_up'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,35,2,9,'drop_off'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,36,4,2,'pick_up'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,37,4,2,'drop_off'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,38,4,3,'pick_up'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,39,4,3,'drop_off'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,40,4,4,'pick_up'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,41,4,4,'drop_off'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,42,4,5,'pick_up'),
	('2023-02-05 22:40:06.351414','2023-02-05 22:40:06.351414',NULL,43,4,5,'drop_off'),
	('2023-04-23 21:02:54.867656','2023-04-23 21:02:54.867656',NULL,44,32,NULL,NULL),
	('2023-04-23 21:08:06.281737','2023-04-23 21:08:06.281737',NULL,45,33,NULL,NULL),
	('2023-04-23 21:29:44.273983','2023-04-23 21:29:44.273983',NULL,46,34,1,'pick_up'),
	('2023-04-23 21:29:44.273983','2023-04-23 21:29:44.273983',NULL,47,34,1,'drop_off'),
	('2023-04-23 22:32:19.928471','2023-04-23 22:32:19.928471',NULL,48,35,1,'pick_up'),
	('2023-04-23 22:32:19.928471','2023-04-23 22:32:19.928471',NULL,49,35,1,'drop_off');

/*!40000 ALTER TABLE `car_locations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table car_translations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `car_translations`;

CREATE TABLE `car_translations` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `car_id` int DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `description` mediumtext,
  `steering` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `IDX_d33b9edd576d1b923f256c63c5` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `car_translations` WRITE;
/*!40000 ALTER TABLE `car_translations` DISABLE KEYS */;

INSERT INTO `car_translations` (`created_at`, `updated_at`, `deleted_at`, `id`, `car_id`, `code`, `name`, `description`, `steering`)
VALUES
	('2023-01-08 10:01:08.576939','2023-05-02 13:20:43.066486',NULL,1,1,'en','Koenigsegg','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-01-08 10:01:08.576939','2023-01-08 10:01:08.576939',NULL,2,1,'ja','トヨタラッシュ2022 1','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-01-08 10:01:08.576939','2023-05-02 13:20:43.132722',NULL,3,2,'en','Nissan GT - R','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-01-08 10:01:08.576939','2023-01-08 10:01:08.576939',NULL,4,2,'ja','トヨタラッシュ2022 2','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-01-08 10:01:08.576939','2023-05-02 13:20:43.134071',NULL,5,3,'en','Toyota Rush 2023','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-01-08 10:01:08.576939','2023-01-08 10:01:08.576939',NULL,6,3,'ja','トヨタラッシュ2022 3','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-01-08 10:01:08.576939','2023-05-02 13:20:43.133498',NULL,7,4,'en','Rolls-Royce','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-01-08 10:01:08.576939','2023-01-08 10:01:08.576939',NULL,8,4,'ja','トヨタラッシュ2022 4','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-01-08 10:01:08.576939','2023-05-02 13:20:43.135511',NULL,9,5,'en','All New Rush','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-01-08 10:01:08.576939','2023-01-08 10:01:08.576939',NULL,10,5,'ja','トヨタラッシュ2022 5','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-01-08 10:01:08.576939','2023-05-02 13:20:43.134598',NULL,11,6,'en','CR  - V','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-01-08 10:01:08.576939','2023-01-08 10:01:08.576939',NULL,12,6,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-01-08 10:01:08.576939','2023-05-02 13:20:43.134997',NULL,13,7,'en','All New Terios','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-01-08 10:01:08.576939','2023-01-08 10:01:08.576939',NULL,14,7,'ja','トヨタラッシュ2022 7','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,15,8,'en','Ferrari 488 GTB','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,16,8,'ja','トヨタラッシュ 2022','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-05-02 13:20:43.135873',NULL,17,9,'en','New MG ZS','Bugatti Chiron  is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,18,9,'ja','トヨタラッシュ2022','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,19,10,'en','Bugatti Chiron','Bugatti Chiron is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,20,10,'ja','トヨタラッシュ2022 3','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,21,11,'en','Bugatti Centodieci','Bugatti Centodieci is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,22,11,'ja','トヨタラッシュ2022 4','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,23,12,'en','Bugatti La Voiture Noire','Bugatti La Voiture Noire is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,24,12,'ja','トヨタラッシュ2022 5','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,25,13,'en','Audi R8 Coupe V10','Audi R8 Coupe V10 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,26,13,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,27,14,'en','R8 Coupe V10 Plus','R8 Coupe V10 Plus is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,28,14,'ja','トヨタラッシュ2022 7','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,29,15,'en','Audi R8 Convertible','Audi R8 Convertible is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,30,15,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,31,16,'en','Porsche 718 Boxster','Porsche 718 Boxster is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,32,16,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,33,17,'en','Porsche 718 Cayman','Porsche 718 Cayman is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,34,17,'ja','トヨタラッシュ2022','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,35,18,'en','Porsche 911 Turbo','Porsche 911 Turbo is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,36,18,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,37,19,'en','Porsche Panamera','Porsche Panamera is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,38,19,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,39,20,'en','Roll-Royce Ghost','Roll-Royce Ghost is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,40,20,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,41,21,'en','Rolls-Royce Wraith','Rolls-Royce Wraith is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,42,21,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,43,22,'en','Rolls-Royce Cullinan','Rolls-Royce Cullinan is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,44,22,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,45,23,'en','McLaren 570S','McLaren 570S is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,46,23,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,47,24,'en','McLaren 650S','McLaren 650S is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,48,24,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,49,25,'en','McLaren 720S','McLaren 720S is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,50,25,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,51,26,'en','Mclaren 570GT','Mclaren 570GT is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,52,26,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,53,27,'en','Toyota Rush 2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,54,27,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,55,28,'en','McLaren GT','McLaren GT is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,56,28,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,57,29,'en','Mclaren 570GT','Mclaren 570GT is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,58,29,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,59,30,'en','Porsche Panamera','Porsche Panamera is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','Manual'),
	('2023-02-05 22:20:00.449739','2023-02-05 22:20:00.449739',NULL,60,30,'ja','トヨタラッシュ2022 6','Toyota Rush 2022 is a 7 Seater SUV available between a price range of Rp 278,8 - 302,2 Million in the Indonesia.','マニュアル');

/*!40000 ALTER TABLE `car_translations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table car_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `car_types`;

CREATE TABLE `car_types` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `car_id` int DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `car_types` WRITE;
/*!40000 ALTER TABLE `car_types` DISABLE KEYS */;

INSERT INTO `car_types` (`created_at`, `updated_at`, `deleted_at`, `id`, `car_id`, `type_id`)
VALUES
	('2023-01-08 10:01:08.584249','2023-04-08 13:30:01.859869',NULL,1,1,1),
	('2023-01-08 10:01:08.584249','2023-01-08 10:01:08.584249',NULL,2,2,2),
	('2023-01-08 10:01:08.584249','2023-04-08 13:30:01.901587',NULL,3,3,3),
	('2023-01-08 10:01:08.584249','2023-01-08 10:01:08.584249',NULL,4,4,2),
	('2023-01-08 10:01:08.584249','2023-04-08 13:30:01.902118',NULL,5,5,1),
	('2023-01-08 10:01:08.584249','2023-01-08 10:01:08.584249',NULL,6,6,2),
	('2023-01-08 10:01:08.584249','2023-04-08 13:30:01.902499',NULL,7,7,3),
	('2023-01-08 10:01:08.584249','2023-04-08 13:30:01.902859',NULL,8,8,1),
	('2023-04-08 13:30:01.903082','2023-04-08 13:30:01.903082',NULL,9,9,4),
	('2023-04-08 13:30:01.903300','2023-04-08 13:30:01.903300',NULL,10,10,6),
	('2023-04-08 13:30:01.903472','2023-04-08 13:30:01.903472',NULL,11,11,5),
	('2023-04-08 13:30:01.903621','2023-04-08 13:30:01.903621',NULL,12,12,4),
	('2023-04-08 13:30:01.905491','2023-04-08 13:30:01.905491',NULL,13,13,7),
	('2023-04-08 13:30:01.905659','2023-04-08 13:30:01.905659',NULL,14,14,8),
	('2023-04-08 13:30:01.905862','2023-04-08 13:30:01.905862',NULL,15,15,8),
	('2023-04-08 13:30:01.906031','2023-04-08 13:30:01.906031',NULL,16,16,9),
	('2023-04-08 13:30:01.906174','2023-04-08 13:30:01.906174',NULL,17,17,1),
	('2023-04-08 13:30:01.906312','2023-04-08 13:30:01.906312',NULL,18,18,5),
	('2023-04-08 13:30:01.906448','2023-04-08 13:30:01.906448',NULL,19,19,7),
	('2023-04-08 13:30:01.906572','2023-04-08 13:30:01.906572',NULL,20,20,8),
	('2023-04-08 13:30:01.906721','2023-04-08 13:30:01.906721',NULL,21,21,6),
	('2023-04-08 13:30:01.906845','2023-04-08 13:30:01.906845',NULL,22,22,5),
	('2023-04-08 13:30:01.906973','2023-04-08 13:30:01.906973',NULL,23,23,4),
	('2023-04-08 13:30:01.907097','2023-04-08 13:30:01.907097',NULL,24,24,9),
	('2023-04-08 13:30:01.907224','2023-04-08 13:30:01.907224',NULL,25,25,11),
	('2023-04-08 13:30:01.907399','2023-04-08 13:30:01.907399',NULL,26,26,12),
	('2023-04-08 13:30:01.907546','2023-04-08 13:30:01.907546',NULL,27,27,3),
	('2023-04-08 13:30:01.907701','2023-04-08 13:30:01.907701',NULL,28,28,10),
	('2023-04-08 13:30:01.907848','2023-04-08 13:30:01.907848',NULL,29,29,1),
	('2023-04-08 13:30:01.907989','2023-04-08 13:30:01.907989',NULL,30,30,3),
	('2023-11-08 17:38:00.623365','2023-11-08 17:38:00.623365',NULL,37,1,2),
	('2023-11-08 17:38:00.623365','2023-11-08 17:38:00.623365',NULL,38,2,3),
	('2023-11-08 17:38:00.623365','2023-11-08 17:38:00.623365',NULL,39,2,4),
	('2023-11-08 17:39:25.421712','2023-11-08 17:39:25.421712',NULL,40,1,1),
	('2023-11-08 17:39:25.421712','2023-11-08 17:39:25.421712',NULL,41,1,2),
	('2023-11-08 17:39:25.421712','2023-11-08 17:39:25.421712',NULL,42,1,3),
	('2023-11-08 17:40:11.185841','2023-11-08 17:40:11.185841',NULL,43,2,1),
	('2023-11-08 17:40:11.185841','2023-11-08 17:40:11.185841',NULL,44,2,2),
	('2023-11-08 17:40:11.185841','2023-11-08 17:40:11.185841',NULL,45,2,3);

/*!40000 ALTER TABLE `car_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table cars
# ------------------------------------------------------------

DROP TABLE IF EXISTS `cars`;

CREATE TABLE `cars` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `capacity` int DEFAULT NULL,
  `gasoline` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `base_price` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image_thumbnail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;

INSERT INTO `cars` (`created_at`, `updated_at`, `deleted_at`, `id`, `capacity`, `gasoline`, `quantity`, `base_price`, `price`, `image_thumbnail`)
VALUES
	('2023-01-08 10:01:08.566152','2023-05-02 13:04:51.759422',NULL,1,4,90,NULL,100.00,85.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007130/1661995458_225_Bo-suu-tap-hinh-nen-sieu-xe-Lamborghini-dep-nhat_b6aqib.jpg'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:01:50.408753',NULL,2,8,80,NULL,120.00,109.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007131/Toyota-Prius-Right-Front-Three-Quarter-90763_uyqvxy.jpg'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:03:16.567559',NULL,3,2,90,NULL,80.00,69.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007131/Untitled_m4r2vl.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.447767',NULL,4,2,90,NULL,90.00,81.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007129/344524844_787049426140056_2554805693304009837_n_eybhsu.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.448246',NULL,5,2,80,NULL,99.00,79.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007130/anh-sieu-xe-lamborghini_7__10132_zoom_isey8q.jpg'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.448516',NULL,6,6,90,NULL,120.00,110.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007129/344524844_787049426140056_2554805693304009837_n_eybhsu.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.448912',NULL,7,6,70,NULL,130.00,119.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007129/342749882_1279691882899678_6906274795807070940_n_qaj0cs.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.449218',NULL,8,6,90,NULL,135.00,120.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007128/342659362_183080504229132_80374809707053272_n_xvefgx.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.449581',NULL,9,6,70,NULL,170.00,149.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007128/341915071_1439850460181910_3929300944899262774_n_dcdlek.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.449937',NULL,10,6,90,NULL,145.00,129.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007128/342228003_243783468141393_6755605397297666604_n_oe3a2u.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.450198',NULL,11,8,80,NULL,120.00,109.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007128/342313400_256954416723506_7053055508630682211_n_kpciso.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.450444',NULL,12,8,90,NULL,133.00,119.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007127/1879239_kvibge.jpg'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.450665',NULL,13,8,80,NULL,145.00,130.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007127/20151013_01_03_s_he4f46.jpg'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.450887',NULL,14,8,90,NULL,200.00,169.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007128/342184677_711485167421123_150605848631799643_n_wudnhu.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.451115',NULL,15,8,70,NULL,75.00,60.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007127/5131cf5afd34459f86f165d5258bcf29_axq01y.jpg'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.451322',NULL,16,8,90,NULL,89.00,65.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007127/341957884_6015458555219896_2227543608415692646_n_vatbmp.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.451529',NULL,17,4,80,NULL,120.00,99.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007127/342116663_188881520696772_112788099997562818_n_q3eng8.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.451742',NULL,18,4,70,NULL,110.00,90.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007127/341969288_623089092675047_1550890355813277863_n_faszw5.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.451951',NULL,19,4,90,NULL,115.00,98.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007130/car4_gh0qhi.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.452164',NULL,20,4,80,NULL,117.00,95.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007130/car3_noxtus.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.452414',NULL,21,4,70,NULL,118.00,99.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007130/car1_mfkb2j.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.452656',NULL,22,2,90,NULL,143.00,130.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007130/car2_gnm8nz.png'),
	('2023-01-08 10:01:08.566152','2023-01-12 08:51:39.548957',NULL,23,6,80,NULL,122.00,100.00,'https://images.ctfassets.net/uwf0n1j71a7j/7jEjYk3qnBAJEFAdBvuYsb/63c42f40181f9e8fa9aa6e128a190d1b/car-insurance-mg-zs-ev.svg'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.452893',NULL,24,6,70,NULL,144.00,120.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007129/344549685_1581252215618443_7465958027062010162_n_pdsejl.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.453290',NULL,25,4,90,NULL,147.00,121.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007129/344290828_1261311561256787_8494532327257531284_n_zwpghf.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.453097',NULL,26,6,80,NULL,199.00,169.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007129/344290828_1261311561256787_8494532327257531284_n_zwpghf.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:11:04.873871',NULL,27,8,70,NULL,187.00,160.00,'https://www.ccarprice.com/products/Toyota_Fortuner_4x4_AT_Diesel_2020.jpg'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.453463',NULL,28,4,80,NULL,168.00,150.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007128/342552438_593490922736452_5997984766194866728_n_urblac.png'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:08:18.453648',NULL,29,2,90,NULL,90.00,80.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007127/1879239_kvibge.jpg'),
	('2023-01-08 10:01:08.566152','2023-05-02 13:11:04.873473',NULL,30,4,80,NULL,185.00,120.00,'https://res.cloudinary.com/da9jz1rtv/image/upload/v1683007127/20151013_01_03_s_he4f46.jpg');

/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table master_cities
# ------------------------------------------------------------

DROP TABLE IF EXISTS `master_cities`;

CREATE TABLE `master_cities` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_6b9b87bf8d01abbf54340f240d` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `master_cities` WRITE;
/*!40000 ALTER TABLE `master_cities` DISABLE KEYS */;

INSERT INTO `master_cities` (`created_at`, `updated_at`, `deleted_at`, `id`, `name`)
VALUES
	('2023-01-08 10:01:08.569989','2023-01-08 10:01:08.569989',NULL,1,'Da Nang'),
	('2023-01-08 10:01:08.569989','2023-01-08 10:01:08.569989',NULL,2,'Hue'),
	('2023-01-08 10:01:08.569989','2023-01-08 10:01:08.569989',NULL,3,'Quang Nam'),
	('2023-01-08 10:01:08.569989','2023-01-08 10:01:08.569989',NULL,4,'Binh Dinh'),
	('2023-01-08 10:01:08.569989','2023-01-08 10:01:08.569989',NULL,5,'Quang Ngai'),
	('2023-01-08 10:01:08.569989','2023-01-08 10:01:08.569989',NULL,6,'Phu Yen'),
	('2023-01-08 10:01:08.569989','2023-01-08 10:01:08.569989',NULL,7,'Nha Trang'),
	('2023-01-08 10:01:08.569989','2023-01-08 10:01:08.569989',NULL,8,'Binh Thuan'),
	('2023-01-08 10:01:08.569989','2023-01-08 10:01:08.569989',NULL,9,'Sai Gon'),
	('2023-01-08 10:01:08.569989','2023-01-08 10:01:08.569989',NULL,10,'Can Tho'),
	('2023-01-08 10:01:08.569989','2023-01-08 10:01:08.569989',NULL,11,'Binh Duong');

/*!40000 ALTER TABLE `master_cities` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table master_languages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `master_languages`;

CREATE TABLE `master_languages` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_2bcccc2e5946c8393b50b08806` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `master_languages` WRITE;
/*!40000 ALTER TABLE `master_languages` DISABLE KEYS */;

INSERT INTO `master_languages` (`created_at`, `updated_at`, `deleted_at`, `id`, `code`)
VALUES
	('2023-01-08 10:01:08.573438','2023-01-08 10:01:08.573438',NULL,1,'ja'),
	('2023-01-08 10:01:08.573438','2023-01-08 10:01:08.573438',NULL,2,'en');

/*!40000 ALTER TABLE `master_languages` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table master_type_translations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `master_type_translations`;

CREATE TABLE `master_type_translations` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `master_type_translations` WRITE;
/*!40000 ALTER TABLE `master_type_translations` DISABLE KEYS */;

INSERT INTO `master_type_translations` (`created_at`, `updated_at`, `deleted_at`, `id`, `type_id`, `code`, `name`)
VALUES
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,1,1,'en','SUV'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,2,1,'ja','クロスオーバー'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,3,2,'en','Crossover'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,4,2,'ja','クロスオーバー'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,5,3,'en','Sedan'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,6,3,'ja','セダン'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,7,4,'en','Truck'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,8,4,'ja','トラック'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,9,5,'en','Wagon / Hatchback'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,10,5,'ja','ワゴン・ハッチバック'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,11,6,'en','Convertible'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,12,6,'ja','コンバーチブル'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,13,7,'en','Luxury'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,14,7,'ja','贅沢'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,15,8,'en','Coupe'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,16,8,'ja','クーペ'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,17,9,'en','Hybrid / Electric'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,18,9,'ja','ハイブリッド/電気'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,19,10,'en','Van / Minivan'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,20,10,'ja','バン・ミニバン'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,21,11,'en','Sports Car'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,22,11,'ja','スポーツカー'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,23,12,'en','Certified Pre-Owned'),
	('2023-01-08 10:01:08.549262','2023-01-08 10:01:08.549262',NULL,24,12,'ja','認定中古品');

/*!40000 ALTER TABLE `master_type_translations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table master_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `master_types`;

CREATE TABLE `master_types` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `master_types` WRITE;
/*!40000 ALTER TABLE `master_types` DISABLE KEYS */;

INSERT INTO `master_types` (`created_at`, `updated_at`, `deleted_at`, `id`)
VALUES
	('2023-01-08 10:01:08.555247','2023-01-08 10:01:08.555247',NULL,1),
	('2023-01-08 10:01:08.555247','2023-01-08 10:01:08.555247',NULL,2),
	('2023-01-08 10:01:08.555247','2023-01-08 10:01:08.555247',NULL,3),
	('2023-01-08 10:01:08.555247','2023-01-08 10:01:08.555247',NULL,4),
	('2023-01-08 10:01:08.555247','2023-01-08 10:01:08.555247',NULL,5),
	('2023-01-08 10:01:08.555247','2023-01-08 10:01:08.555247',NULL,6),
	('2023-01-08 10:01:08.555247','2023-01-08 10:01:08.555247',NULL,7),
	('2023-01-08 10:01:08.555247','2023-01-08 10:01:08.555247',NULL,8),
	('2023-01-08 10:01:08.555247','2023-01-08 10:01:08.555247',NULL,9),
	('2023-01-08 10:01:08.555247','2023-01-08 10:01:08.555247',NULL,10),
	('2023-01-08 10:01:08.555247','2023-01-08 10:01:08.555247',NULL,11),
	('2023-01-08 10:01:08.555247','2023-01-08 10:01:08.555247',NULL,12);

/*!40000 ALTER TABLE `master_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;

INSERT INTO `migrations` (`id`, `timestamp`, `name`)
VALUES
	(2,1672620280963,'users1672620280963'),
	(3,1672621002014,'users1672621002014'),
	(4,1672621118148,'users1672621118148'),
	(5,1672621231869,'users1672621231869'),
	(9,1672650166196,'users1672650166196'),
	(13,1672799827027,'oauthRefreshTokens1672799827027'),
	(22,1673146722657,'updateDb1673146722657'),
	(23,1673166784495,'reviews1673166784495'),
	(25,1673183046928,'ordersAndOrderDetails1673183046928'),
	(26,1673254844818,'paymentMethods1673254844818'),
	(27,1673582777619,'database1673582777619'),
	(28,1673585156299,'addDatetimeAtCarFavorite1673585156299');

/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table oauth_refresh_tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `oauth_refresh_tokens`;

CREATE TABLE `oauth_refresh_tokens` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `refresh_token` mediumtext,
  `user_id` int DEFAULT NULL,
  `expired_in` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `oauth_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_refresh_tokens` DISABLE KEYS */;

INSERT INTO `oauth_refresh_tokens` (`created_at`, `updated_at`, `deleted_at`, `id`, `refresh_token`, `user_id`, `expired_in`)
VALUES
	('2023-05-02 22:18:29.954376','2023-05-02 22:18:52.000000','2023-05-02 22:18:52.000000',80,'22817041-dbd4-4b72-b970-bd87f3f79cc9',2,'7 days'),
	('2023-05-02 22:19:05.204239','2023-05-02 22:21:52.000000','2023-05-02 22:21:52.000000',81,'42981b7f-088b-430b-b8b2-39b5579a7a62',2,'7 days'),
	('2023-05-02 22:22:15.702552','2023-05-03 18:15:34.000000','2023-05-03 18:15:34.000000',82,'391d013f-c753-4393-96b5-7c638385af90',2,'7 days'),
	('2023-05-03 18:59:43.401336','2023-05-03 19:38:40.000000','2023-05-03 19:38:40.000000',83,'8debea23-19af-486b-951d-ff852bcf5b15',60,'7 days'),
	('2023-05-03 19:15:30.175588','2023-05-03 19:15:30.175588',NULL,84,'66dd5b19-dd8b-4c53-8e8f-0fe2b53b9e09',2,'7 days'),
	('2023-05-03 19:21:11.879500','2023-05-03 19:21:11.879500',NULL,85,'934f13fc-ac47-4de5-9710-00dd981742af',2,'7 days'),
	('2023-05-03 19:24:55.633189','2023-05-03 19:29:58.000000','2023-05-03 19:29:58.000000',86,'018f1131-4781-4819-a49b-f2741ca3c7e9',2,'7 days'),
	('2023-05-03 19:31:16.975944','2023-05-03 19:40:36.000000','2023-05-03 19:40:36.000000',87,'eda62cab-f0d7-4939-87b7-975c41c31ba9',2,'7 days'),
	('2023-05-03 19:39:36.573603','2023-05-03 19:44:27.000000','2023-05-03 19:44:27.000000',88,'5947a6dc-aa2e-4e18-a1ff-be383ce7263f',60,'7 days'),
	('2023-05-03 19:40:50.330927','2023-05-03 19:42:37.000000','2023-05-03 19:42:37.000000',89,'8878b6ca-58da-403b-a10f-2908dd33c86e',2,'7 days'),
	('2023-05-03 19:42:55.095267','2023-05-03 22:25:37.000000','2023-05-03 22:25:37.000000',90,'96f7b9fe-5155-4088-979e-4641ebc31f6f',2,'7 days'),
	('2023-05-03 19:44:45.526938','2023-05-03 19:47:43.000000','2023-05-03 19:47:43.000000',91,'2c6bb28c-a930-4739-bc73-94628284266d',60,'7 days'),
	('2023-05-03 19:47:46.207755','2023-05-03 19:49:00.000000','2023-05-03 19:49:00.000000',92,'7087f94c-99d8-400c-bb68-c279981bc813',60,'7 days'),
	('2023-05-03 19:49:14.548164','2023-05-03 19:50:57.000000','2023-05-03 19:50:57.000000',93,'1f73da37-919b-4444-b847-429d81814581',60,'7 days'),
	('2023-05-03 19:51:03.695973','2023-05-03 19:53:23.000000','2023-05-03 19:53:23.000000',94,'7a4500a4-2d96-48ac-9064-bfd0d4308517',60,'7 days'),
	('2023-05-03 19:53:37.116880','2023-05-04 12:42:44.000000','2023-05-04 12:42:44.000000',95,'cf153a3a-eb10-4517-9a37-5ec8211caa9b',60,'7 days'),
	('2023-05-03 22:25:57.985296','2023-05-03 22:31:45.000000','2023-05-03 22:31:45.000000',96,'c7f92d98-bccb-4f5d-a10e-217a67f82ea0',2,'7 days'),
	('2023-05-03 22:32:34.557753','2023-05-03 22:41:44.000000','2023-05-03 22:41:44.000000',97,'fc396c09-eae9-47c2-87c3-fc17e66dab6b',2,'7 days'),
	('2023-05-03 22:42:43.219568','2023-05-04 12:59:40.000000','2023-05-04 12:59:40.000000',98,'e27f1d85-ef77-4f3e-98c7-9c334ce99eca',2,'7 days'),
	('2023-05-03 22:51:21.863981','2023-05-03 22:51:21.863981',NULL,99,'2f5adec0-157c-4778-949c-da352ccef876',2,'7 days'),
	('2023-05-04 12:03:05.971360','2023-05-04 12:03:05.971360',NULL,100,'e4ec8b4f-019c-43b8-acaf-dc4c55052f85',2,'7 days'),
	('2023-05-04 12:04:23.772452','2023-05-04 12:04:23.772452',NULL,101,'d9831b07-d352-440e-9979-4ef7e18de43d',2,'7 days'),
	('2023-05-04 12:06:33.221010','2023-05-04 12:06:33.221010',NULL,102,'7306a86a-c11e-415f-ad74-443376354e6b',2,'7 days'),
	('2023-05-04 12:52:20.717355','2023-05-04 12:52:20.717355',NULL,103,'70816d21-30b3-495d-9414-faf9365dff75',2,'7 days'),
	('2023-05-04 12:53:25.931721','2023-05-04 12:53:25.931721',NULL,104,'4ebfb398-a33b-455d-9cc0-6f004d990729',2,'7 days'),
	('2023-05-04 12:54:45.866842','2023-05-04 12:54:45.866842',NULL,105,'ead1ea9d-1101-46fd-9db5-93503d88b3db',2,'7 days'),
	('2023-05-04 13:08:27.050341','2023-05-04 13:27:44.000000','2023-05-04 13:27:44.000000',106,'e14aa2b8-bf8f-4c4d-8576-156074bcae02',60,'7 days'),
	('2023-05-04 14:40:02.096438','2023-05-04 14:40:02.096438',NULL,107,'a323d82e-4ec4-4c1f-a631-a6f7c401a857',60,'7 days'),
	('2023-12-11 18:59:53.707077','2023-12-11 18:59:53.707077',NULL,108,'d5c18207-e912-4a6a-9880-5a296192043e',61,'7 days'),
	('2023-12-12 08:03:38.345863','2023-12-12 08:03:38.345863',NULL,109,'8c9cadf5-660e-4ba8-9de9-0afbf3f5b582',61,'7 days');

/*!40000 ALTER TABLE `oauth_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table order_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_details`;

CREATE TABLE `order_details` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `car_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `pick_up_city_id` int DEFAULT NULL,
  `pick_up_datetime` datetime DEFAULT NULL,
  `drop_off_city_id` int DEFAULT NULL,
  `drop_off_datetime` datetime DEFAULT NULL,
  `sub_totals` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;

INSERT INTO `order_details` (`created_at`, `updated_at`, `deleted_at`, `id`, `order_id`, `car_id`, `quantity`, `pick_up_city_id`, `pick_up_datetime`, `drop_off_city_id`, `drop_off_datetime`, `sub_totals`)
VALUES
	('2023-05-02 22:30:13.512192','2023-05-03 22:53:56.088177',NULL,45,45,1,NULL,1,'2023-01-03 05:30:02',1,'2023-01-05 05:30:05',259.25),
	('2023-05-02 22:33:31.663031','2023-05-03 22:53:56.088747',NULL,46,46,1,NULL,1,'2023-01-07 05:33:11',1,'2023-01-08 05:33:14',174.25),
	('2023-05-02 22:34:24.177748','2023-05-03 22:53:56.089072',NULL,47,47,2,NULL,4,'2023-04-03 05:34:16',4,'2023-04-04 05:34:18',223.45),
	('2023-05-02 22:37:07.936811','2023-05-03 22:53:56.089341',NULL,48,48,1,NULL,1,'2023-03-10 16:34:38',1,'2023-03-12 18:34:47',265.00),
	('2023-05-03 14:02:26.945066','2023-05-03 22:53:56.089607',NULL,49,49,1,NULL,5,'2023-04-15 21:02:15',6,'2023-04-16 21:02:20',180.00),
	('2023-05-03 19:02:22.759648','2023-05-03 19:02:22.759648',NULL,50,50,1,NULL,1,'2023-05-18 02:01:42',1,'2023-05-19 02:02:08',174.25),
	('2023-05-03 19:26:07.719630','2023-05-03 19:26:07.719630',NULL,51,51,1,NULL,5,'2023-05-22 02:21:47',1,'2023-05-23 02:22:00',174.25),
	('2023-05-03 19:29:41.159535','2023-05-03 19:29:41.159535',NULL,52,52,1,NULL,1,'2023-05-04 02:29:35',6,'2023-05-04 02:29:36',89.25),
	('2023-05-04 13:09:37.121270','2023-05-04 13:09:37.121270',NULL,53,53,1,NULL,1,'2023-05-05 20:09:24',6,'2023-05-06 20:09:29',180.00);

/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `payment_method_id` int DEFAULT NULL,
  `promotion_id` int DEFAULT NULL,
  `bill_name` varchar(30) DEFAULT NULL,
  `bill_phone_number` varchar(30) DEFAULT NULL,
  `bill_address` varchar(30) DEFAULT NULL,
  `bill_city` varchar(30) DEFAULT NULL,
  `bill_promo_code` varchar(50) DEFAULT NULL,
  `bill_promo_type` enum('percent','absolute') DEFAULT NULL,
  `bill_promo_datetime_start` datetime DEFAULT NULL,
  `bill_promo_datetime_end` datetime DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` enum('open','inprogress','success','failed') DEFAULT NULL,
  `paymentMethodId` int DEFAULT NULL,
  `yeu_cau` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;

INSERT INTO `orders` (`created_at`, `updated_at`, `deleted_at`, `id`, `user_id`, `payment_method_id`, `promotion_id`, `bill_name`, `bill_phone_number`, `bill_address`, `bill_city`, `bill_promo_code`, `bill_promo_type`, `bill_promo_datetime_start`, `bill_promo_datetime_end`, `total`, `status`, `paymentMethodId`, `yeu_cau`)
VALUES
	('2023-05-02 22:30:13.460968','2023-05-02 22:30:13.000000',NULL,45,2,1,NULL,'Quy duong','012332123','asdasd','sadsdsd',NULL,NULL,NULL,NULL,259.25,'success',NULL,NULL),
	('2023-05-02 22:33:31.653574','2023-05-02 22:33:31.000000',NULL,46,2,1,NULL,'Quy duong','012332123','sadasd','sadasd',NULL,NULL,NULL,NULL,174.25,'success',NULL,NULL),
	('2023-05-02 22:34:24.170760','2023-05-02 22:34:24.000000',NULL,47,2,1,NULL,'Quy duong','012332123','sad','asd',NULL,NULL,NULL,NULL,223.45,'success',NULL,NULL),
	('2023-05-02 22:37:07.926261','2023-05-02 22:37:07.000000',NULL,48,2,2,NULL,'Quy duong','012332123','asdsd','sadasd',NULL,NULL,NULL,NULL,265.00,'inprogress',NULL,NULL),
	('2023-05-03 14:02:26.843035','2023-05-03 14:02:27.000000',NULL,49,2,2,NULL,'Quy duong','012332123','ád','cccc',NULL,NULL,NULL,NULL,180.00,'inprogress',NULL,NULL),
	('2023-05-03 19:02:22.750236','2023-05-03 19:02:22.000000',NULL,50,60,1,NULL,'DUONG Quy','0123456789','âsewqe','áddsadsad',NULL,NULL,NULL,NULL,174.25,'success',NULL,NULL),
	('2023-05-03 19:26:07.670494','2023-05-03 19:26:07.000000',NULL,51,60,1,NULL,'DUONG Quy','0123456789','sssss','ssssss',NULL,NULL,NULL,NULL,174.25,'success',NULL,NULL),
	('2023-05-03 19:29:41.150194','2023-05-03 19:29:41.000000',NULL,52,2,1,NULL,'Quy duong','012332123','sdasd','sadasd',NULL,NULL,NULL,NULL,89.25,'success',NULL,NULL),
	('2023-05-04 13:09:37.071369','2023-05-04 13:09:59.000000',NULL,53,60,2,NULL,'DUONG Quy','0123456789','ádasd','ádasd',NULL,NULL,NULL,NULL,180.00,'success',NULL,NULL);

/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table payment_methods
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payment_methods`;

CREATE TABLE `payment_methods` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `informations` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;

INSERT INTO `payment_methods` (`created_at`, `updated_at`, `deleted_at`, `id`, `name`, `informations`)
VALUES
	('2023-01-09 16:04:49.840030','2023-01-09 16:07:31.369452',NULL,1,'COD','{\"fee\": 5, \"type\": \"percent\"}'),
	('2023-01-09 16:05:18.576069','2023-01-09 16:07:31.373124',NULL,2,'Stripe','{\"tax\": 10, \"type\": \"dorla\"}');

/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table reviews
# ------------------------------------------------------------

DROP TABLE IF EXISTS `reviews`;

CREATE TABLE `reviews` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `order_detail_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `content` mediumtext,
  `stars` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;

INSERT INTO `reviews` (`created_at`, `updated_at`, `deleted_at`, `id`, `order_detail_id`, `user_id`, `content`, `stars`)
VALUES
	('2023-05-02 22:53:09.639655','2023-05-02 22:53:09.639655',NULL,3,48,2,'nice',5),
	('2023-05-02 22:56:14.257058','2023-05-02 22:56:14.257058',NULL,4,45,2,'hi',5),
	('2023-05-03 19:02:44.967419','2023-05-03 19:02:44.967419',NULL,5,50,60,'ádfg',5);

/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table seeders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `seeders`;

CREATE TABLE `seeders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table transactions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `transactions`;

CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `status` enum('success','failed','inprogress') DEFAULT NULL,
  `information` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;

INSERT INTO `transactions` (`id`, `order_id`, `created_at`, `updated_at`, `deleted_at`, `status`, `information`)
VALUES
	(80,53,'2023-05-04 13:09:59.924992','2023-05-04 13:09:59.924992',NULL,'success','smmjJkKLrQ2KtG8v0/wztrf9RC/+98xrE6gfjbR5cj+EraEvWFY0ce/TTfUfiZqm8o+wFhuiE+6L7TNP4zTFATq+Eu9w09JC3d6CZ8PglIbqnXce2ylHz1QeBa569iVMay2Z1HYG67kFs6SmspNSOuB6pd0i6ifpgPQZ5rJ3VyazQVkih5GpHfW2hIxw9Xs9/1v1DGjrF4VPJ7oYHaOMT6N+Rchk+P0K5mQx4NFhEBvofmKSoSyevykt7wEAqsit/5WRO2OGTS4JST3Ho1yHN9IWGth6CBXfZmGHwIlQq9M0A1E4XZkYEASOs+f+WF78/RS2o0a/ispBhTVlK3Cp3qkflqC7wLDh5Ii0rB3M+/GCeFxhu+M1rOQ+TQxUeGv6Ihv5U/Q5fzCwpptackqEqu2mLzukRIPpTmJc0wpYiKR6ew4eScOy0UknKumFR3tWM6x4liDJshvEmwInuFl2UYnh19XClvpr3sXTgm4Eg31ZQ5zwbZ4BE6PBqzzhU/9U9mKjsZsm+H+Q7I1vuVUUjBvz3JI6DUMFQa4Z824MKrv7x5QeAxWx6Ubaa2FB+vbNahsW2E99BdAFDdT6ZVHMaUX9e9uyl7a0rP5RZfldea8RGjkIjcHhiCFHq/0ExYJyz1bPM/pWkr3mwbamgfEvMlt0CfWgw30tP/DDXOmqaW+2/0TU8Sg8PNqyL11SBvkPPtU5qX/IK6hSai2ZGDUFkYoD6qpTEA5eaQoAqe7BiyFP7yLpDbQTigxEffNda4UO/u2DDstzgMoVK4h+PTnD5aZY50W4ogHfZiyJByE0AshbJOQQZJ8zpVWt0s3/e146xH5hPpYpUN4fLZWeWO3fuz9LFyyxJOn6uz3DL2v57IztDhKZHT8oPMkWYEWnM9EEU79bHodQPJdx/YeKcNCklcEFMqcaCacy4TfK8qovLyC60K1yU/RjK2dgC4Svi6M2XRfjFV22ctMtd296Xv8+Vfbu0fxMxVJUp5Z7dt79eYFZHoG54ux+Q1+uUjbnOIaQRQqgjfi3IshKJHTsQGlstD9vuELEb1838UGB4y/r94lVjqjcDp9Yuw8XKWNFyLafOmMcm4uX6FcS7Azy/Nu7sSGa6uXLwOHNNb+BsdTaTrypae4b1rvemkP9HyP1l4ETRJo0lC6HGnoH+bRaNg88HKwBIcR6yZ2PQfaLwkEPSXuOjBCI2MixJ6HwrKD6rB9FeQ3dpvZB13jifLZMIY21OTBDjlF1mj2gwqJpTBh27SQvzEF0n7vJTxAvE/ggv8udK5ySWC14t7T7xmerAQbUqcrpIps1v2809f5NITBhQHJeoSERuiepfgIAUApBjRnoioJQo6EBInFTp9GC0z03ZwVRi1fjC0zLCX0MDuYW67/NLwMCoFCnHutOJT2iwPjldkev4eX/Yxn4N9oOlKkRVMCEanSCxZHnF4LUVwq+PSO53xr8HR+N0/tJoxZCJcvcPI8OnLQVhA8/qCgEqXR2HEiGwYl0tpE5OdRYBBF13iWlGrF0uQcWtENxyxpwhLYnxcde27lACl7W4D7FypTnYNfZB/50yPgVxLaqPubAWSIsqbVXM0bsMn6vBEdk0/by1h71FWmFp/cLlgV/HnBEs0rRKnRgQWzk0RStv0DIqPLZ3POn+PMuEPukzqyxmPU0BndSfL9ZBSAJ43w+8pHTeNNeLxhzTZWQXSOwbiSMLoWcHMUSQ9luHMGAQDSOhXqPFcgoZDxXSaaRWKrQAt/rEd9TqehdpLYIsjDDYU1jxcqaiTihEJ+Lfhah5zXbxvquNT+YUxYqUJ/WgNwD0VY+NBuuwKQ+pE9C8tn++vMkPc18N0lQbCZlpdRhoea76zKc');

/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `created_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `avatar_path` varchar(255) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`created_at`, `updated_at`, `deleted_at`, `id`, `first_name`, `last_name`, `email`, `username`, `password`, `address`, `phone_number`, `avatar_path`, `position`)
VALUES
	('2023-01-02 16:04:46.225987','2023-11-08 17:14:55.061350',NULL,1,'nulll','undefined','duongquyit12@gmail.com','duongquyit21','$2b$10$9ZiYW.JbSxuvpxTDQFKex.n1cqOE5h0uecyI8BMA.0hSkTIVxzNG.',NULL,'0123321123',NULL,'user'),
	('2023-01-02 22:04:39.967078','2023-11-08 17:09:55.669385',NULL,2,'Quy','nulll','duongquyit123@gmail.com','admin','$2b$10$icQOXuUM2wJb4QkDpXSHu.nVsgA2aKqF0.oQeTmf2IdwNs3qysyI.',NULL,'012332123',NULL,'admin'),
	('2023-04-16 15:56:06.241358','2023-05-04 12:10:02.676225',NULL,59,'Duong','Quy','myemail@gmail.com','admin1','$2b$10$msYBTPKNu2e.hZw8Q.Hoe.ZPBJaIbPXf0sQn0PlADvNJSshU3//Ha',NULL,'0123321123',NULL,'user'),
	('2023-05-03 18:59:43.221969','2023-05-03 18:59:43.221969',NULL,60,'DUONG','Quy','ndquy@gmail.com','duongquyit123','$2b$10$lAfFu.b/A/PWH6hjY4f0HOH6ToDaWAP7G3qZMCAaPKeVcqvychPra',NULL,'0123456789',NULL,NULL),
	('2023-12-11 18:59:36.808018','2023-12-11 18:59:36.808018',NULL,61,'string','string','dasdasdasdasd@gmail.com','xxboy.tlxx','$2b$10$bnnngwOlAIFu7YeLHMoLGudAegaCDGuh06rIU5vtysj5Lqm2vlI2m',NULL,'0123321123',NULL,NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

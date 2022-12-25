CREATE DATABASE car_rent;
USE car_rent;

CREATE TABLE cars (
  id INT NOT NULL AUTO_INCREMENT PRiMARY KEY UNSIGNED,
  name VARCHAR(50),
  description VARCHAR,
  steering VARCHAR(30),
  capacity INT,
  gasoline INT,
  price DEC(10, 2),
  current_price DEC(10, 2),
  created_at DATETIME,
  updated_at DATETIME
);

CREATE INDEX idx_cars_name ON cars(name);
CREATE INDEX idx_cars_capacity ON cars(capacity);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRiMARY KEY UNSIGNED,
  first_name NVARCHAR(50),
  last_name NVARCHAR(50),
  email VARCHAR(255) UNIQUE,
  position VARCHAR(255),
  avatar VARCHAR(),
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  address NVARCHAR(255),
  phone_number VARCHAR(30),
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE user_favorite_cars (
  user_id INT NOT NULL PRiMARY KEY UNSIGNED,
  car_id INT NOT NULL PRiMARY KEY UNSIGNED,
  created_at DATETIME
);

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT PRiMARY KEY UNSIGNED,
  car_id INT,
  user_id INT,
  content NVARCHAR(500),
  star INT,
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE car_images (
  id INT NOT NULL AUTO_INCREMENT PRiMARY KEY UNSIGNED,
  car_id INT,
  path VARCHAR(255),
  created_at DATETIME
);

CREATE INDEX idx_car_images_car_id ON cars(car_id);

CREATE TABLE master_types (
  id INT NOT NULL AUTO_INCREMENT PRiMARY KEY UNSIGNED,
  name VARCHAR(255) UNIQUE,
  created_at DATETIME
);

CREATE TABLE car_types (
  car_id INT NOT NULL PRiMARY KEY UNSIGNED,
  type_id INT NOT NULL PRiMARY KEY UNSIGNED,
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE car_locations (
  location_type VARCHAR(10) NOT NULL PRIMARY KEY UNSIGNED,
  car_id INT NOT NULL PRIMARY KEY UNSIGNED,
  city_id INT NOT NULL PRIMARY KEY UNSIGNED,
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE master_cities (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNSIGNED,
  name VARCHAR(50) UNIQUE,
  created_at DATETIME
);

CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNSIGNED,
  car_id INT,
  user_id INT,
  customer_name NVARCHAR(50),
  customer_phone_number VARCHAR(30),
  customer_address NVARCHAR(255),
  customer_city_id INT,
  pick_up_city_id INT,
  pick_up_datetime DATETIME,
  drop_off_city_id INT,
  drop_off_datetime DATETIME,
  payment_response VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME
);

CREATE INDEX idx_orders_car_id ON orders(car_id);
CREATE INDEX idx_orders_pick_up_city ON orders(pick_up_city_id);
CREATE INDEX idx_orders_pick_up_datetime ON orders(pick_up_datetime);
CREATE INDEX idx_orders_drop_off_city ON orders(drop_off_city_id);
CREATE INDEX idx_orders_drop_off_datetime ON orders(drop_off_datetime);

CREATE TABLE promotions (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNSIGNED,
  code VARCHAR(50) UNIQUE,
  rate DEC(10, 2),
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE queues (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNSIGNED,
  message JSON,
  status ENUM('OPEN', 'IN PROGRESS', 'CLOSED'),
  created_at DATETIME,
  updated_at DATETIME,
)

CREATE INDEX idx_queues_status ON queues(status);

PRAGMA foreign_keys = ON;

CREATE TABLE category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) NOT NULL
  );

CREATE TABLE ad (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  categoryId INTEGER,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  author VARCHAR(100) NOT NULL,
  price INTEGER,
  createdAt DATE,
  imageUrl VARCHAR(100),
  city VARCHAR(100),

  FOREIGN KEY (categoryId) REFERENCES category(id)
  );

  ALTER TABLE ad DROP COLUMN category;

  INSERT INTO category (name) VALUES ("vêtement"), ("voiture"), ("autre");

   INSERT INTO ad (title, description, owner, price,location) VALUES 
  ("Big Bike", "YOLO", "Jean", 56,  "Bordeaux" ), 
  ("Big car", "YOLO", "Serge", 165, "Bordeaux" ), 
  ("Truck",  "YOLO","Pascal", 10,  "Bordeaux" ), 
  ("Truck2",  "YOLO","Pierre", 100,  "Bordeaux" ), 
  ("Truck32",  "YOLO","Pierre", 20,  "Bordeaux" ),  
  ("Truck42",  "YOLO","Jpp", 325,  "Paris" ),
  ("carotte",  "YOLO","Jean", 325,  "Paris" ),
  ("Truck42",  "YOLO","Marie", 200,  "Paris" ),
  ("banane",  "YOLO","Paul", 354,  "Paris" ),
  ("Truck742",  "YOLO","Brian", 1000,  "Paris" ),
  ("chemise",  "YOLO","Mathilde", 250,  "Lyon" ),
  ("pantalon",  "YOLO","Mathilde", 300,  "Lyon" ),
  ("Truck412",  "YOLO","Jeanne", 210,  "Lyon" ),
  ("chaussette",  "YOLO","Jpp", 3215,  "Lyon" ),
  ("Truck402",  "YOLO","Florence", 2325,  "Lyon" ),
  ("Truck402",  "YOLO","Jean-pierre", 3235,  "Lyon" ),
  ("Truck442",  "YOLO","Claude", 31225,  "Lyon" ),
   ("robe",  "YOLO","Sergio", 32475,  "Lyon" );

  INSERT INTO ad (title, categoryId, author, price, createdAt, city) VALUES 
  ("Big Bike",3, "Jean", 56, 2023-09-05, "Bordeaux" ), 
  ("Big car",2, "Serge", 165, 2023-08-05,"Bordeaux" ), 
  ("Truck",2, "Pascal", 0, 2023-09-03, "Bordeaux" ), 
  ("Truck2",2, "Pierre", 100, 2023-07-03, "Bordeaux" ), 
  ("Truck32",2, "Pierre", 20, 2023-09-10, "Bordeaux" ),  
  ("Truck42",2, "Jpp", 325, 2023-09-03, "Paris" ),
  ("carotte",3, "Jean", 325, 2023-09-12, "Paris" ),
  ("Truck42",2, "Marie", 200, 2023-09-02, "Paris" ),
  ("banane",3, "Paul", 354, 2023-08-03, "Paris" ),
  ("Truck742",2, "Brian", 1000, 2023-06-03, "Paris" ),
  ("chemise",1, "Mathilde", 250, 2023-09-01, "Lyon" ),
  ("pantalon",1, "Mathilde", 300, 2023-09-10, "Lyon" ),
  ("Truck412",2, "Jeanne", 210, 2023-09-08, "Lyon" ),
  ("chaussette",1, "Jpp", 3215, 2023-09-05, "Lyon" ),
  ("Truck402",2, "Florence", 2325, 2023-04-03, "Lyon" ),
  ("Truck402",2, "Jean-pierre", 3235, 2023-05-03, "Lyon" ),
  ("Truck442",2, "Claude", 31225, 2023-07-03, "Lyon" ),
   ("robe",1, "Sergio", 32475, 2023-07-03, "Lyon" );

PRAGMA foreign_keys = ON;
 INSERT INTO ad (title, categoryId, author, price, createdAt, city) VALUES 
  ("Big Bike",73, "Jean", 56, 2023-09-05, "Bordeaux" );

SELECT * FROM ad ;

SELECT * FROM ad WHERE city = "Bordeaux" ;

ALTER TABLE ad DROP COLUMN category;

DELETE FROM ad WHERE price < 40 ;

UPDATE ad SET price = 150 WHERE createdAt = 2023-09-01 ;

SELECT AVG(price) FROM ad WHERE city = "Paris" ; 

SELECT city, AVG(price) FROM ad GROUP BY city ;

DROP TABLE category ;
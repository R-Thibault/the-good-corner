CREATE TABLE ad (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  author VARCHAR(100) NOT NULL,
  price INTEGER,
  createdAt DATE,
  imageUrl VARCHAR(100),
  city VARCHAR(100),
  category VARCHAR(100)
  );

  INSERT INTO ad (title, author, price, createdAt, city) VALUES 
  ("Big Bike", "Jean", 56, 2023-09-05, "Bordeaux" ), 
  ("Big car", "Serge", 165, 2023-08-05,"Bordeaux" ), 
  ("Truck", "Pascal", 0, 2023-09-03, "Bordeaux" ), 
  ("Truck2", "Pierre", 100, 2023-07-03, "Bordeaux" ), 
  ("Truck32", "Pierre", 20, 2023-09-10, "Bordeaux" ),  
  ("Truck42", "Jpp", 325, 2023-09-03, "Paris" ),
  ("Truck42", "Jean", 325, 2023-09-12, "Paris" ),
  ("Truck42", "Marie", 200, 2023-09-02, "Paris" ),
  ("Truck542", "Paul", 354, 2023-08-03, "Paris" ),
  ("Truck742", "Brian", 1000, 2023-06-03, "Paris" ),
  ("Truck842", "Mathilde", 250, 2023-09-01, "Lyon" ),
  ("Truck422", "Mathilde", 300, 2023-09-10, "Lyon" ),
  ("Truck412", "Jeanne", 210, 2023-09-08, "Lyon" ),
  ("Truck342", "Jpp", 3215, 2023-09-05, "Lyon" ),
  ("Truck402", "Florence", 2325, 2023-04-03, "Lyon" ),
  ("Truck402", "Jean-pierre", 3235, 2023-05-03, "Lyon" ),
  ("Truck442", "Claude", 31225, 2023-07-03, "Lyon" ),
   ("Truck12", "Sergio", 32475, 2023-07-03, "Lyon" );



SELECT * FROM ad ;

SELECT * FROM ad WHERE city = "Bordeaux" ;

DELETE FROM ad WHERE price < 40 ;

UPDATE ad SET price = 150 WHERE createdAt = 2023-09-01 ;

SELECT AVG(price) FROM ad WHERE city = "Paris" ; 

SELECT city, AVG(price) FROM ad GROUP BY city ;
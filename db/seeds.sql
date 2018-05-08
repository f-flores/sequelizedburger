### seeds.sql

USE burgers_db;

INSERT INTO burgers (burger_name) VALUES 
  ("California cheeseburger"), 
  ("Double cheeseburger"),
  ("Bacon cheeseburger"),
  ("Quarter pound hamburger");

INSERT INTO burgers (burger_name, devoured) VALUES
  ("Chicken burger", false),
  ("Turkey burger", false);
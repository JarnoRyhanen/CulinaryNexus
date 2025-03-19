CREATE DATABASE IF NOT EXISTS test;

USE test;

DROP TABLE IF EXISTS Recipe_ingredients;
DROP TABLE IF EXISTS Recipe;
DROP TABLE IF EXISTS Ingredient;
DROP TABLE IF EXISTS Recipe_type;
DROP TABLE IF EXISTS App_user;
DROP TABLE IF EXISTS User_role;

CREATE TABLE IF NOT EXISTS User_role (
    role_id INT NOT NULL AUTO_INCREMENT,
    role_type VARCHAR (5) NOT NULL,
    PRIMARY KEY(role_id)
);

CREATE TABLE IF NOT EXISTS App_user (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(40) NOT NULL UNIQUE,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_role INT NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_role) REFERENCES User_role(role_id)
);

CREATE TABLE IF NOT EXISTS Recipe_type (
    type_id INT NOT NULL AUTO_INCREMENT,
    type_name VARCHAR(20) NOT NULL,
    PRIMARY KEY (type_id)
);

CREATE TABLE IF NOT EXISTS Ingredient (
    ingredient_id INT NOT NULL AUTO_INCREMENT,
    ingredient_name VARCHAR(20) NOT NULL,
    unit VARCHAR(15) NOT NULL,
    PRIMARY KEY (ingredient_id)
);

CREATE TABLE IF NOT EXISTS Recipe (
    recipe_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    thumbnail_url VARCHAR(100),
    recipe_description TEXT NOT NULL,
    likes INT DEFAULT 0,
    guide TEXT NOT NULL,
    recipe_type INT NOT NULL,
    creator INT NOT NULL,
    PRIMARY KEY (recipe_id),
    FOREIGN KEY (recipe_type) REFERENCES Recipe_type(type_id),
    FOREIGN KEY (creator) REFERENCES App_user(user_id)
);

CREATE TABLE IF NOT EXISTS Recipe_ingredients (
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity VARCHAR(20),
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id)
);

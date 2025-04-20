-- Remove "CREATE DATABASE" as PostgreSQL does not support it in this context
-- CREATE DATABASE IF NOT EXISTS test;

-- Remove "USE test;" as PostgreSQL does not support it
-- USE test;

-- Drop tables if they exist
/* DROP TABLE IF EXISTS Recipe_ingredients;
DROP TABLE IF EXISTS Recipe;
DROP TABLE IF EXISTS Ingredient;
DROP TABLE IF EXISTS Recipe_type;
DROP TABLE IF EXISTS App_user;
DROP TABLE IF EXISTS User_role; */

-- Create tables
CREATE TABLE IF NOT EXISTS User_role (
    role_id SERIAL PRIMARY KEY,
    role_type VARCHAR(5) NOT NULL
);

CREATE TABLE IF NOT EXISTS App_user (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(40) NOT NULL UNIQUE,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_password_hash VARCHAR(255),
    user_role INT NOT NULL,
    FOREIGN KEY (user_role) REFERENCES User_role(role_id)
);

CREATE TABLE IF NOT EXISTS Recipe_type (
    type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS Ingredient (
    ingredient_id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(100) NOT NULL,
    unit VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS Recipe (
    recipe_id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    thumbnail_url TEXT,
    recipe_description TEXT NOT NULL,
    likes INT DEFAULT 0,
    guide TEXT NOT NULL,
    recipe_type INT NOT NULL,
    creator INT NOT NULL,
    FOREIGN KEY (recipe_type) REFERENCES Recipe_type(type_id),
    FOREIGN KEY (creator) REFERENCES App_user(user_id)
);

CREATE TABLE IF NOT EXISTS Recipe_ingredients (
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity VARCHAR(100),
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id)
);
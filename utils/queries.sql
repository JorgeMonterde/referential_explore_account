--Database
CREATE DATABASE refexpacc
    WITH
    OWNER = jorgemo
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Users table
CREATE TABLE users (
  user_id serial NOT NULL PRIMARY KEY, 
  user_name varchar(255) NOT NULL UNIQUE,
  first_name varchar(45) NOT NULL, 
  surname varchar(100),
  email varchar(45) NOT NULL UNIQUE, 
  hashed_password varchar(100) NOT NULL, 
  admin boolean NOT NULL, 
  logged boolean NOT NULL
);

-- Projects table
CREATE TABLE projects (
  user_id int,
  project_id serial NOT NULL PRIMARY KEY,
  title varchar(200) NOT NULL,
  specification varchar(500),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
  ON DELETE CASCADE
);

-- Artworks table
CREATE TABLE artworks (
  project_id int,
  artwork_id serial NOT NULL PRIMARY KEY,
  artwork_mongo_id varchar(100) NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(project_id)
  ON DELETE CASCADE
);
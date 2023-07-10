--Database
CREATE DATABASE freelance_projects
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Users table
CREATE TABLE users (
  user_id serial NOT NULL PRIMARY KEY, 
  user_name varchar(255) UNIQUE,
  first_name varchar(45) NOT NULL, 
  surname varchar(100),
  email varchar(45) NOT NULL UNIQUE, 
  hashed_password varchar(100) NOT NULL, 
  admin boolean NOT NULL, 
  logged boolean
);

-- Projects table
CREATE TABLE projects (
  user_id int,
  project_id serial NOT NULL PRIMARY KEY,
  title varchar(200),
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
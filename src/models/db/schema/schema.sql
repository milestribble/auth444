CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  encrypted_password VARCHAR(255)
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE user_roles (
  user_id INT REFERENCES users(id),
  role_id INT REFERENCES roles(id)
);

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(255)
);

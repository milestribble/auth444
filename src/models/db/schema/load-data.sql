

INSERT INTO users
  (username, encrypted_password)
VALUES
  ('baibhav', '3456yu' ),
  ('miles', '465789'),
  ('john','56e7890i');

INSERT INTO roles
  (name)
VALUES
  ('admin'),
  ('regular');

INSERT INTO user_roles
  (user_id, role_id)
VALUES
  (1, 2),
  (2, 2),
  (3, 2),
  (3, 1);

INSERT INTO contacts
  (name, phone)
VALUES
  ('John','444-666-8888'),
  ('Jill','999-666-1111'),
  ('Bill','444-777-8888');

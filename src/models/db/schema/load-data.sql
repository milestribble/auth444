

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

INSERT INTO users
(email, hash, two_factor, is_admin)
VALUES
($1, $2, $3, $4)
RETURNING *;
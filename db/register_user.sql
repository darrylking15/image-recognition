INSERT INTO users
(timestamp, email, hash, first_name, last_name, face_rec, is_admin)
VALUES
($1, $2, $3, $4, $5, $6, $7)
RETURNING *;
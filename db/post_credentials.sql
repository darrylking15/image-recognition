INSERT INTO credentials
(website_name, website_url, username, password, user_id, timestamp)
VALUES
($1, $2, $3, $4, $5, $6);
SELECT * FROM credentials;
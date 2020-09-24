INSERT INTO credentials
(website_name, website_url, username, password)
VALUES
($1, $2, $3, $4);
SELECT * FROM credentials;
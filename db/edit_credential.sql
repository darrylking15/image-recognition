UPDATE credentials 
SET 
website_name = $1,
website_url = $2,
username = $3,
password = $4,
timestamp = $5

WHERE cred_id = $6;


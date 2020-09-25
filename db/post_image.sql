INSERT INTO images
(user_id, timestamp, s3_url, s3_bucket, s3_key)
VALUES
($1, $2, $3, $4, $5);

SELECT img_id
FROM images
WHERE timestamp = $6;
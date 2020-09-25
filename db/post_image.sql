INSERT INTO images
(timestamp, s3_url, s3_bucket, s3_etag, img_base64)
VALUES
($1, $2, $3, $4, $5);
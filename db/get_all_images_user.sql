SELECT * FROM images
WHERE user_id = $1
ORDER BY timestamp DESC;
UPDATE users
SET 
face_bucket = $1,
face_id = $2,
face_url = $3,
face_key = $4,
face_etag = $5,
face_base64 = $6,
face_metadata = $7

WHERE user_id = $8;
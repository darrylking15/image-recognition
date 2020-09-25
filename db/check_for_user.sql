SELECT u.user_id, u.email, u.hash, u.first_name, u.last_name, u.face_rec, u.is_admin, u.profile_face_id, i.s3_url, i.s3_bucket, i.s3_key, i.img_base64, i.img_metadata
FROM users u
JOIN profile_faces p
ON u.profile_face_id = p.profile_id
JOIN images i
ON p.img_id = i.img_id
WHERE u.email = $1;
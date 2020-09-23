SELECT u.user_id, u.email, u.first_name, u.last_name, u.face_rec, u.is_admin, i.s3_url, i.s3_bucket, i.s3_key
FROM users u
JOIN images i
ON u.profile_img_id = i.img_id
WHERE u.email = $1;

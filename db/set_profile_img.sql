INSERT INTO profile_faces
( user_id, img_id )
VALUES
( $1, $2 )
RETURNING profile_id;
CREATE TABLE users (
    user_id         SERIAL PRIMARY KEY NOT NULL,
    email           VARCHAR(64) NOT NULL,
    hash            TEXT,
    first_name      VARCHAR(32),
    last_name       VARCHAR(32),
    face_rec        BOOLEAN,
    is_admin        BOOLEAN  
);

CREATE TABLE credentials (
    cred_id         SERIAL PRIMARY KEY NOT NULL,
    website_name    VARCHAR(32),
    website_url     VARCHAR(64),
    username        VARCHAR(32),
    password        VARCHAR(32),
    crypr_pass      TEXT,
    update_time     BIGINT,
    user_id         INT NOT NULL REFERENCES users(user_id)
);

CREATE TABLE images (
    img_id         SERIAL PRIMARY KEY NOT NULL,
    timestamp      BIGINT,
    s3_url         VARCHAR(128),
    s3_bucket      VARCHAR(64),
    s3_etag        VARCHAR(64),
    s3_key         VARCHAR(64),
    img_metadata   TEXT, 
    img_base64     TEXT
);

INSERT INTO images
( timestamp, s3_url, s3_bucket, s3_key )
VALUES
( 1600969557, 'https://imagerek2020.s3.us-east-2.amazonaws.com/noprofilephoto.jpg', 'imagerek2020', 'noprofilephoto.jpg' );

ALTER TABLE users
ADD COLUMN profile_img_id INT DEFAULT 1
REFERENCES images(img_id);

INSERT INTO users
( email, hash, first_name, last_name, face_rec, is_admin, profile_img_id )
VALUES
( 'admin', '$2b$10$7bN40uQTVaphSa3RnzeISOj6a8HZpjGpEVuKOiKo2MKgsHHACYrn6', 'admin', 'admin', false, true, 1 )


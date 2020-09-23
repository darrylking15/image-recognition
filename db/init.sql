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
    img_base64     TEXT,
    user_id        INT NOT NULL REFERENCES users(user_id) 
);

ALTER TABLE users
ADD COLUMN profile_img_id INT
REFERENCES images(img_id);
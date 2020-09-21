CREATE TABLE users (
    user_id         SERIAL PRIMARY KEY NOT NULL,
    email           VARCHAR(64) NOT NULL,
    hash            TEXT,
    two_factor      BOOLEAN,
    is_admin        BOOLEAN,  
);

CREATE TABLE credentials (
    cred_id         SERIAL PRIMARY KEY NOT NULL,
    website_name    VARCHAR(32),
    website_url     VARCHAR(64),
    username        VARCHAR(32),
    password        VARCHAR(32),
    crypr_pass      TEXT,
    update_time     TIMESTAMP,
    user_id         INT NOT NULL REFERENCES users(user_id)
);

CREATE TABLE images (
    img_id         SERIAL PRIMARY KEY NOT NULL,
    timestamp      TIMESTAMP,
    type           VARCHAR(32),
    angle          VARCHAR(32),
    notes          TEXT,
    url            TEXT,
    base63         TEXT,
    user_id        INT NOT NULL REFERENCES users(user_id) 
);

ALTER TABLE users
ADD COLUMN profile_img_id INT
REFERENCES images(img_id);
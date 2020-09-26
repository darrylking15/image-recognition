CREATE TABLE users (
    user_id         SERIAL PRIMARY KEY NOT NULL,
	timestamp		BIGINT,
    email           VARCHAR(64),
    hash            VARCHAR(128),
    first_name      VARCHAR(64),
    last_name       VARCHAR(64),
    face_rec        BOOLEAN,
    is_admin        BOOLEAN,
	face_timestamp  BIGINT,
	face_bucket     VARCHAR(64),
	face_id         VARCHAR(128),
	face_url        VARCHAR(128),
	face_key        VARCHAR(64),
	face_etag       VARCHAR(64),
	face_base64     TEXT,
	face_metadata   TEXT
);

CREATE TABLE images (
    img_id          SERIAL PRIMARY KEY NOT NULL,
    timestamp       BIGINT,
	s3_bucket       VARCHAR(64),
    s3_url          VARCHAR(128),
	s3_key          VARCHAR(64),
    s3_etag         VARCHAR(64),
    base64          TEXT,
	metadata        TEXT, 
	user_id         INT REFERENCES users(user_id)
);

CREATE TABLE credentials (
    cred_id         SERIAL PRIMARY KEY NOT NULL,
    timestamp       BIGINT,
	website_name    VARCHAR(64),
    website_url     VARCHAR(128),
    username        VARCHAR(64),
    password        VARCHAR(64),
    pass_crypt      TEXT,
    user_id         INT REFERENCES users(user_id)
);


--Dummy Data

INSERT INTO users
( email, hash, first_name, last_name, face_rec, is_admin )
VALUES
( 'admin', '$2b$10$7bN40uQTVaphSa3RnzeISOj6a8HZpjGpEVuKOiKo2MKgsHHACYrn6', 'admin', 'admin', false, true ),
( 'qwerty@qwerty.com', '$2b$10$eP1Lowqo65eqlDLPqGi/DuqrgygIH/6DDNjLt5Z5nbGd.BBUbSPx6', 'qwerty', 'qwerty', false, true );


INSERT INTO credentials
( user_id, website_name, website_url, username, password, timestamp )
VALUES
( 1, 'Facebook', 'www.facebook.com', 'joeSmoe', '1234567password', 1600798098 ),
( 1, 'Facebook', 'www.facebook.com', 'fredHead', '1234567passwordy', 1600797098 ),
( 1, 'LinkedIn', 'www.linkedin.com', 'joeSmoe', '1234567password', 1600798048 ),
( 1, 'LinkedIn', 'www.linkedin.com', 'fredHead', '1234567passwordy', 1600778048 ),
( 1, 'Facebook', 'www.facebook.com', 'joeSmoe', '1234567password', 1600798098 ),
( 1, 'Facebook', 'www.facebook.com', 'fredHead', '1234567passwordy', 1600797098 ),
( 1, 'LinkedIn', 'www.linkedin.com', 'joeSmoe', '1234567password', 1600798048 ),
( 2, 'LinkedIn', 'www.linkedin.com', 'fredHead', '1234567passwordy', 1600778048 ),
( 2, 'Facebook', 'www.facebook.com', 'joeSmoe', '1234567password', 1600798098 ),
( 2, 'Facebook', 'www.facebook.com', 'fredHead', '1234567passwordy', 1600797098 ),
( 2, 'LinkedIn', 'www.linkedin.com', 'joeSmoe', '1234567password', 1600798048 ),
( 2, 'LinkedIn', 'www.linkedin.com', 'fredHead', '1234567passwordy', 1600778048 ),
( 2, 'Facebook', 'www.facebook.com', 'joeSmoe', '1234567password', 1600798098 ),
( 2, 'Facebook', 'www.facebook.com', 'fredHead', '1234567passwordy', 1600797098 ),
( 2, 'LinkedIn', 'www.linkedin.com', 'joeSmoe', '1234567password', 1600798048 ),
( 2, 'LinkedIn', 'www.linkedin.com', 'fredHead', '1234567passwordy', 1600778048 );
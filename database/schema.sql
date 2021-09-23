-- TO RUN FILE: log into postgres and run \i database/schema.sql


-- CREATE DATABASE AND TABLES
DROP DATABASE IF EXISTS fitterdb;
CREATE DATABASE fitterdb;
\c fitterdb;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS dailyData;
DROP TABLE IF EXISTS friendMessages;
DROP TABLE IF EXISTS publicMessages;

CREATE TABLE users (
  id                  SERIAL    UNIQUE   PRIMARY KEY,
  firstName           VARCHAR   NOT NULL,
  lastName            VARCHAR   NOT NULL,
  email               VARCHAR   NOT NULL,
  username            VARCHAR   NOT NULL,
  descriptionMessage  VARCHAR   NULL,
  userPassword        VARCHAR   NOT NULL,
  shareBirthday       BOOLEAN   DEFAULT FALSE,
  birthday            VARCHAR,
  picture             VARCHAR
);

CREATE TABLE friends (
  id                  SERIAL    UNIQUE   PRIMARY KEY,
  userID         INT       NOT NULL      REFERENCES users(id),
  friendID       INT       NOT NULL      REFERENCES users(id)
);

CREATE TABLE goals (
  id                  SERIAL      UNIQUE     PRIMARY KEY,
  userId                INT       NOT NULL   REFERENCES users(id),
  waterGoal             INT       DEFAULT 0,
  calorieGoal           INT       DEFAULT 0,
  weightGoal            INT       DEFAULT 0,
  shareBoolean          BOOLEAN   DEFAULT FALSE
);

CREATE TABLE dailyData (
  id              SERIAL    UNIQUE     PRIMARY KEY,
  userID          INT       NOT NULL   REFERENCES users(id),
  timestamp       TIMESTAMP DEFAULT now() UNIQUE,
  water           INT       DEFAULT 0,
  calories        INT       DEFAULT 0,
  weight          INT       DEFAULT 0,
  shareBoolean    BOOLEAN   DEFAULT FALSE
);

CREATE TABLE friendMessages (
  id              SERIAL    UNIQUE     PRIMARY KEY,
  userID          INT       NOT NULL   REFERENCES users(id),
  friendID        INT       NOT NULL   REFERENCES users(id),
  message         VARCHAR   NOT NULL,
  timestamp       TIMESTAMP DEFAULT now()
);

CREATE TABLE comments (
  id             SERIAL    UNIQUE   PRIMARY KEY,
  userID         INT       NOT NULL      REFERENCES users(id),
  friendID       INT       NOT NULL      REFERENCES users(id),
  comment        VARCHAR    ,
  tileId         INT      NOT NULL
);

-- DATA LOAD
\COPY users(firstName,lastName,email,username,descriptionMessage,userPassword,shareBirthday,birthday,picture) FROM 'data/fitterUsers.csv' DELIMITER ',' CSV HEADER;
\COPY friends(userID,friendID) FROM 'data/fitterFriends.csv' DELIMITER ',' CSV HEADER;
\COPY goals(userId,waterGoal,calorieGoal,weightGoal,shareBoolean) FROM 'data/goals.csv' DELIMITER ',' CSV HEADER;
\COPY dailyData(userId,timestamp,water,calories,weight,shareBoolean) FROM 'data/dailyData.csv' DELIMITER ',' CSV HEADER;
\COPY friendMessages(userID,friendID,message,timestamp) FROM 'data/friendMessages.csv' DELIMITER ',' CSV HEADER;



-- STRETCH GOALS: public forum
-- CREATE TABLE publicMessages (
--   id          INT       NOT NULL   PRIMARY KEY,
--   userID      INT       NOT NULL   REFERENCES users(id),
--   message     VARCHAR   NOT NULL,
--   timestamp   TIMESTAMP DEFAULT now()
-- );


-- SELECT setval(pg_get_serial_sequence(users, users.id), max(users.id)) FROM users;
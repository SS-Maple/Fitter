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
  id                  SERIAL   NOT NULL   PRIMARY KEY,
  firstName           VARCHAR,
  lastName            VARCHAR,
  email               VARCHAR,
  username            VARCHAR,
  descriptionMessage  VARCHAR,
  userPassword        VARCHAR,
  shareBirthday       BOOLEAN,
  birthday            VARCHAR,
  picture             VARCHAR,
  securityQuestion    VARCHAR,
  securityAnswer      VARCHAR,
  UNIQUE(email)
);

CREATE TABLE friends (
  id             INT       NOT NULL   PRIMARY KEY,
  userID         INT       NOT NULL   REFERENCES users(id),
  friendID       INT       NOT NULL   REFERENCES users(id)
);

CREATE TABLE goals (
  id                    INT       NOT NULL   PRIMARY KEY,
  userId                INT       NOT NULL   REFERENCES users(id),
  waterGoal             INT       NOT NULL,
  calorieGoal           INT       NOT NULL,
  weightGoal            INT       NOT NULL,
  shareBoolean          BOOLEAN
);

CREATE TABLE dailyData (
  id              INT       NOT NULL   PRIMARY KEY,
  userID          INT       NOT NULL   REFERENCES users(id),
  timestamp       TIMESTAMP DEFAULT now(),
  water           INT       NOT NULL,
  calories        INT       NOT NULL,
  weight          INT       NOT NULL,
  shareBoolean    BOOLEAN
);

CREATE TABLE friendMessages (
  id              INT       NOT NULL   PRIMARY KEY,
  userID          INT       NOT NULL   REFERENCES users(id),
  friendID        INT       NOT NULL   REFERENCES users(id),
  message         VARCHAR   NOT NULL,
  timestamp       TIMESTAMP DEFAULT now()
);

-- DATA LOAD
\COPY users(id,firstName,lastName,email,username,descriptionMessage,userPassword,shareBirthday,birthday,picture,securityQuestion,securityAnswer) FROM 'data/fitterUsers.csv' DELIMITER ',' CSV HEADER;
\COPY friends(id,userID,friendID) FROM 'data/fitterFriends.csv' DELIMITER ',' CSV HEADER;
\COPY goals(id,userId,waterGoal,calorieGoal,weightGoal,shareBoolean) FROM 'data/goals.csv' DELIMITER ',' CSV HEADER;
\COPY dailyData(id,userId,timestamp,water,calories,weight,shareBoolean) FROM 'data/dailyData.csv' DELIMITER ',' CSV HEADER;
\COPY friendMessages(id,userID,friendID,message,timestamp) FROM 'data/friendMessages.csv' DELIMITER ',' CSV HEADER;



-- STRETCH GOALS: public forum
-- CREATE TABLE publicMessages (
--   id          INT       NOT NULL   PRIMARY KEY,
--   userID      INT       NOT NULL   REFERENCES users(id),
--   message     VARCHAR   NOT NULL,
--   timestamp   TIMESTAMP DEFAULT now()
-- );



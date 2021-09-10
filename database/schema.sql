-- TO RUN FILE: log into postgres and run \i schema.sql


-- CREATE DATABASE AND TABLES
DROP DATABASE IF EXISTS fitterdb;
CREATE DATABASE fitterdb;
\c fitterdb;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS dailyData;
DROP TABLE IF EXISTS friendsMessages;
DROP TABLE IF EXISTS publicMessages;
DROP TABLE IF EXISTS notifications;

CREATE TABLE users (
  id                  INT       NOT NULL   PRIMARY KEY,
  firstName           VARCHAR   NOT NULL,
  lastName            VARCHAR   NOT NULL,
  email               VARCHAR   NOT NULL,
  descriptionMessage  VARCHAR   NOT NULL,
  userPassword        VARCHAR   NOT NULL,
  shareBirthday       BOOLEAN   NOT NULL,
  birthday            VARCHAR,
  picture             VARCHAR,
  securityQuestion    VARCHAR   NOT NULL,
  securityAnswer      VARCHAR   NOT NULL
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

CREATE TABLE notifications (
  id                     INT       NOT NULL    PRIMARY KEY,
  userId                 INT       NOT NULL    REFERENCES users(id),
  notificationText       VARCHAR   NOT NULL,
  notificationTimestamp  TIMESTAMP DEFAULT now(),
  new                    BOOLEAN DEFAULT true
);

-- DATA LOAD
\COPY users(id,firstName,lastName,email,descriptionMessage,userPassword,shareBirthday,birthday,picture,securityQuestion,securityAnswer) FROM 'data/fitterUsers.csv' DELIMITER ',' CSV HEADER;
\COPY friends(id,userID,friendID) FROM 'data/fitterFriends.csv' DELIMITER ',' CSV HEADER;
\COPY goals(id,userId,waterGoal,calorieGoal,weightGoal,shareBoolean) FROM 'data/goals.csv' DELIMITER ',' CSV HEADER;
\COPY dailyData(id,userId,timestamp,water,calories,weight,shareBoolean) FROM 'data/dailyData.csv' DELIMITER ',' CSV HEADER;
\COPY friendMessages(id,userID,friendID,message,timestamp) FROM 'data/friendMessages.csv' DELIMITER ',' CSV HEADER;
\COPY notifications(id,userId,notificationText,notificationTimestamp,new) FROM 'data/notifications.csv' DELIMITER ',' CSV HEADER;


-- STRETCH GOALS: public forum
-- CREATE TABLE publicMessages (
--   id          INT       NOT NULL   PRIMARY KEY,
--   userID      INT       NOT NULL   REFERENCES users(id),
--   message     VARCHAR   NOT NULL,
--   timestamp   TIMESTAMP DEFAULT now()
-- );

--D-D-D-D-D-D-D-DROP THE TABLE

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS dailyData;
DROP TABLE IF EXISTS friendsMessages;
DROP TABLE IF EXISTS publicMessages;

CREATE TABLE users (
  id             INT       NOT NULL   PRIMARY KEY,
  firstName      VARCHAR   NOT NULL,
  lastName       VARCHAR   NOT NULL,
  email          VARCHAR   NOT NULL,
  description    VARCHAR   NOT NULL,
  password       VARCHAR   NOT NULL,
  shareBirthday  BOOLEAN   NOT NULL,
  birthday       VARCHAR,
  picture        VARCHAR,
  securityQuestion VARCHAR NOT NULL,
  securityAnswer VARCHAR   NOT NULL
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
  timestamp       TIMESTAMP DEFAULT now(),
);

CREATE TABLE publicMessages (
  id          INT       NOT NULL   PRIMARY KEY,
  userID      INT       NOT NULL   REFERENCES users(id),
  message     VARCHAR   NOT NULL,
  timestamp   TIMESTAMP DEFAULT now(),
);
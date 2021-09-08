const { Client } = require('pg');
const connectionString = `postgres://pscheutzow:password@localhost:5432/fitterdb`;

const client = new Client({
  connectionString: connectionString
});

var connect = async () => {
  await client.connect((err) => {
      if (err) {
          console.log(err);
      } else {
          console.log('database connected!');
      }
  });
};

connect();

module.exports.client = client;

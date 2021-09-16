const { Client } = require('pg');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const connectionString = process.env.connectionString;

console.log(__dirname + '/..' + '/.env')

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

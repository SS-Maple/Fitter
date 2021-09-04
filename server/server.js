const express = require('express');
const notificationRoutes = require('./notifications.js')

let app = express();
let port = 3000;

app.use(express.urlencoded());
app.use(express.static(__dirname + '/../client/dist'));
app.use('/notifications', notificationRoutes);

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
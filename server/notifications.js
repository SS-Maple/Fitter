const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const router = express.router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));








module.exports.router = router;
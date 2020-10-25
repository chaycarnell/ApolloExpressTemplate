const express = require('express');
const router = express.Router();
const privateController = require('../controllers/private');

router.get('/example', privateController.example);

module.exports = router;

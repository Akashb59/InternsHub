const express = require('express');

const router = express.Router();
const contactController = require('./../controllers/contactController');

router.route('/').post(contactController.sendEmail);

module.exports = router;

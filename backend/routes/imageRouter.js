const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const controller = require('../controllers/imageController');

router.post('/image', upload.single('image'), controller.post);

module.exports = router;
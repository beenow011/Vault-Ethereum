const express = require('express');
const { uploadImage } = require('../controllers/uploadImage.controller');
const { uploadUserImage } = require('../middleware/multer.middleware');
const router = express.Router();

router.post('/uploadImage', uploadUserImage, uploadImage)

module.exports = router;
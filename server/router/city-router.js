const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const cityController = require('../controllers/city-controller');
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({ storage });

router.post('/city', upload.single('image'), authMiddleware, adminMiddleware, cityController.createCity);
router.get('/', cityController.getCities);

module.exports = router;

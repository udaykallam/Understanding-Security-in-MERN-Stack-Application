// routes/places-router.js
const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place-controller');
const fileUpload = require('express-fileupload');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');

// Enable file upload
router.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

router.post('/data', async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }
  next();
},authMiddleware, adminMiddleware, placeController.createPlaceController);

router.get('/getdata', authMiddleware, adminMiddleware,placeController.getPlacesController);

module.exports = router;

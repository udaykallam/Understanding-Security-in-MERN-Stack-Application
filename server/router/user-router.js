const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.post('/change-password',userController.changePassword);

router.get('/user-emails',userController.getUsersEmails);

router.post('/sendotp',userController.sendOTP);

router.post('/verifyotp',userController.verityOTP);

router.delete('/deleteotp',userController.deleteOTP);

module.exports = router;

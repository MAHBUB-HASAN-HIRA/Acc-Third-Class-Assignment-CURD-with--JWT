const express = require('express');
const router = express.Router();
const areaController = require('../controllers/Area.controller');
const userController = require('../controllers/User.controller');

router.post('/postData', areaController.postData);
router.get('/getAllData', areaController.getAllData);
router.get('/getById', areaController.getById);
router.patch('/patchById', areaController.patchById);
router.put('/putById', userController.isAuthentication, areaController.putById);
router.delete('/deleteById', userController.isAuthentication, areaController.deleteById);

module.exports = router;
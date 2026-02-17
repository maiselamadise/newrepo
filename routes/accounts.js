const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { validateUpdate, validatePassword } = require('../middleware/validation');

router.get('/manage', accountController.manageView);
router.get('/update/:id', accountController.showUpdateForm);
router.post('/update', validateUpdate, accountController.updateAccount);
router.post('/change-password', validatePassword, accountController.changePassword);
router.get('/logout', accountController.logout);

module.exports = router;

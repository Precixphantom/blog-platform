const express = require('express');
const controller = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/register', controller.showRegister);

// handle register
router.post('/register', controller.registerUser);


router.get('/login', controller.showLogin);

// handle login
router.post('/login', controller.loginUser);

// handle dashboard
router.get('/dashboard', authMiddleware, controller.showDashboard);

// handle logout

router.get('/logout', (req, res) => {
    res.clearCookie('token'); 
    res.redirect('/login'); 
});
router.post('/logout', controller.logoutUser);


module.exports = router;
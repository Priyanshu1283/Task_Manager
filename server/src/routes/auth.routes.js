const { Router } = require('express');
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../validators/auth.validator');
const verifyJWT = require('../middlewares/auth.middleware');

const router = Router();

router.post('/register', registerValidator, registerUser);
router.post('/login', loginValidator, loginUser);
router.post('/logout', verifyJWT, logoutUser);
router.get('/me', verifyJWT, getCurrentUser);

module.exports = router;

const express = require('express')
const router = express.Router()

const { protect } = require('../middlewares/authMiddleware')
const { registerUser, loginUser, getMe } = require('./user.controller')

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router
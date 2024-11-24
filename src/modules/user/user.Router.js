const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, AllUser, deleteUser } = require('./user.controller')
const { protect, adminOnly } = require('../middlewares/authMiddleware')


router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/', protect, adminOnly, AllUser);
router.delete('/:id', deleteUser);
router.get('/me', protect, getMe);

module.exports = router
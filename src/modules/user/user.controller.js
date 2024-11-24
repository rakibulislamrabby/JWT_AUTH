const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../user/user.model')

//Register new user
//POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    })
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// Authenticate a user
//POST /api/users/login
//Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//Get user data
//GET /api/users/me
//Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
});

// show all user only the admin
const AllUser = asyncHandler(async (req, res) => {
    console.log("ROle", req.user.role);
    // if (req.user.role !== 'admin') {
    //     res.status(403);
    //     throw new Error('Access denied: Only admins can view all users');
    // }
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.findByIdAndDelete(id);
        res.status(200).json({ message: "Delete user successfully", result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    AllUser,
    deleteUser
}
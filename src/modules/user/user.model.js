const Joi = require('joi')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.base': 'Name must be a string',
                'string.empty': 'Name cannot be empty',
                'string.min': 'Name must be at least 3 characters long',
                'string.max': 'Name cannot exceed 30 characters',
                'any.required': 'Please add a name',
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.base': 'Email must be a string',
                'string.email': 'Please provide a valid email',
                'any.required': 'Please add an email',
            }),
        password: Joi.string()
            .min(8)
            .required()
            .messages({
                'string.base': 'Password must be a string',
                'string.empty': 'Password cannot be empty',
                'string.min': 'Password must be at least 8 characters long',
                'any.required': 'Please add a password',
            }),
        role: {
            type: String,
            enum: ['user', 'admin'], // Only two roles
            default: 'user',        // Default role is 'user'
        },
    },

    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
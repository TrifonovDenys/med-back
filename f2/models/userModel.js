import { compare, genSalt, hash } from 'bcrypt';
import mongoose from 'mongoose';

const user = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Set password for user'],
            select: false,
        },
        year: Number,
        role: {
            type: String,
            enum: ['user', 'admin', 'moderator'],
            default: 'user',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// pre save mongoose hook
user.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

/**
 * Castom mongoose method to validate password
 * @param {string} candidate
 * @param {string} passwordHash
 * @returns {Promise<boolean}
 */
user.methods.checkPassword = (candidate, passwordHash) => compare(candidate, passwordHash);

export default mongoose.model('User', user);

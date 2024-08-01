import { compare, genSalt, hash } from 'bcrypt';
import crypto from 'crypto';
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
        avatarUrl: {
            type: String,
            required: false,
            default: '',
        },
        passwordResetToken: String,
        passwordResetExpires: Date,
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
user.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log('raw', resetToken);

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return this.passwordResetToken;
};
export default mongoose.model('User', user);

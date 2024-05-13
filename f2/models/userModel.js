import { genSalt, hash } from 'bcrypt';
import mongoose from 'mongoose';

const user = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'set email'],
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

// pre save mongoose hook
user.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

export default mongoose.model('User', user);

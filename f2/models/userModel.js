import mongoose from 'mongoose';

const user = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'set email'],
    },
    password: {
        type: String,
        required: true,
    },
    timestamps: true,
    version: true,
});

export default mongoose.model('User', contact);

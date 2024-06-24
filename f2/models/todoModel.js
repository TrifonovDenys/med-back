import mongoose, { Types } from 'mongoose';

const TodoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 30,
            trim: true,
        },
        description: {
            type: String,
            maxLength: 300,
        },
        due: {
            type: Date,
            required: true,
        },
        complited: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Types.ObjectId,
            ref: 'User',
            required: [true, 'Todo must have owner'],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default mongoose.model('Todo', TodoSchema);

import { Schema, Types } from 'mongoose';
import { formatDate } from '../utils/formDate.js';
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        transform: (_, ret) => {
            ret.createdAt = formatDate(ret.createdAt); // Apply formatting here
            return ret;
        },
    },
    id: false,
});
export default reactionSchema;

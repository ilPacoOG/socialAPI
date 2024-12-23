import { Schema, model } from 'mongoose';
import reactionSchema from './ReactionSchema.js';
import { formatDate } from '../utils/formDate.js';
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        transform: (_, ret) => {
            ret.createdAt = formatDate(ret.createdAt); // Apply formatting in the transform function
            return ret;
        },
    },
    id: false,
});
// Virtual to calculate reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions ? this.reactions.length : 0; // Avoid accessing undefined
});
export const Thought = model('Thought', thoughtSchema);

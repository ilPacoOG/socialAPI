import { Schema, model, Document } from 'mongoose';
import reactionSchema, { IReaction } from './ReactionSchema';
import { formatDate } from '../utils/formDate'; // Corrected file path

export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

const thoughtSchema = new Schema<IThought>(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.createdAt = formatDate(ret.createdAt); // Apply formatting in the transform function
        return ret;
      },
    },
    id: false,
  }
);

// Virtual to calculate reaction count
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions ? this.reactions.length : 0; // Avoid accessing undefined
});

export const Thought = model<IThought>('Thought', thoughtSchema);

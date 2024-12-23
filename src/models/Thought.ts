import { Schema, model, Types, Document } from 'mongoose';
import reactionSchema, { IReaction } from './ReactionSchema';
import { formatDate } from '../utils/formatDate';

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
      get: formatDate,
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

export const Thought = model<IThought>('Thought', thoughtSchema);

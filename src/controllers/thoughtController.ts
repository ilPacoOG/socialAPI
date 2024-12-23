import { Request, Response } from 'express';
import { Thought } from '../models/Thought.js';
import { User } from '../models/User.js';

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    return res.status(200).json(thoughts);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.status(200).json(thought);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { thoughts: newThought._id },
    });
    return res.status(201).json(newThought);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.status(200).json(updatedThought);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }
    );
    return res.status(200).json({ message: 'Thought deleted' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.status(200).json(thought);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.status(200).json(thought);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

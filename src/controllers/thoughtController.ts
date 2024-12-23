import { Request, Response } from 'express';
import { Thought } from '../models/Thought';
import { User } from '../models/User';

export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = await Thought.create(req.body);
    // Add thought to user's thought list
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { thoughts: newThought._id },
    });
    res.status(201).json(newThought);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(200).json(updatedThought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    // Remove thought from user's thought list
    await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }
    );
    res.status(200).json({ message: 'Thought deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

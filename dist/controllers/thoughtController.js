var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Thought } from '../models/Thought.js';
import { User } from '../models/User.js';
export const getThoughts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield Thought.find();
        return res.status(200).json(thoughts);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const getSingleThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(thought);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newThought = yield Thought.create(req.body);
        yield User.findByIdAndUpdate(req.body.userId, {
            $push: { thoughts: newThought._id },
        });
        return res.status(201).json(newThought);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const updateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedThought = yield Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(updatedThought);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        yield User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } });
        return res.status(200).json({ message: 'Thought deleted' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(thought);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.status(200).json(thought);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

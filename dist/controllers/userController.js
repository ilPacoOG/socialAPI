var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from '../models/User.js';
import { Thought } from '../models/Thought.js';
export const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find().populate('thoughts').populate('friends');
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield User.create(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Remove associated thoughts
        yield Thought.deleteMany({ _id: { $in: user.thoughts } });
        return res.status(200).json({ message: 'User and associated thoughts deleted' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

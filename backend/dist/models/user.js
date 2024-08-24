"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contributions: {
        type: [String],
        default: [],
        ref: 'Pattern',
    },
});
userSchema.statics.build = (attributes) => {
    return new UserModel(attributes);
};
const UserModel = mongoose_1.default.model('User', userSchema);
exports.UserModel = UserModel;

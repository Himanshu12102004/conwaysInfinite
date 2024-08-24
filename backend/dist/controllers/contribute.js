"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@himanshu_guptaorg/utils");
const pattern_1 = require("../models/pattern");
const user_1 = require("../models/user");
const parseGrtid_1 = __importDefault(require("../helpers/parseGrtid"));
const contribute = (0, utils_1.async_error_handler)(async (req, res, next) => {
    const user = req.user;
    let { name, description, grid } = req.body;
    if (description.length >= 150)
        throw new utils_1.Custom_error({
            errors: [{ message: 'descriptionTooLong' }],
            statusCode: 400,
        });
    const alreadyPresent = await pattern_1.PatternModel.findOne({ name });
    if (alreadyPresent)
        throw new utils_1.Custom_error({
            errors: [{ message: 'nameAlreadyExist' }],
            statusCode: 400,
        });
    grid = (0, parseGrtid_1.default)(grid);
    const pattern = await pattern_1.PatternModel.build({
        name,
        description,
        grid,
        contributedBy: user._id,
    }).save();
    await user_1.UserModel.findByIdAndUpdate(user._id, {
        $push: { contributions: pattern._id },
    });
    const response = new utils_1.Custom_response(true, null, { pattern }, 'Pattern contributed successfully', 201, null);
    res.status(201).json(response);
});
exports.default = contribute;

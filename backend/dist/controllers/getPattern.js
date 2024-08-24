"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@himanshu_guptaorg/utils");
const pattern_1 = require("../models/pattern");
function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
}
const getPattern = (0, utils_1.async_error_handler)(async (req, res, next) => {
    let { name, your, search } = req.query;
    let patterns = [];
    if (name) {
        name = unicodeToChar(name);
        patterns = await pattern_1.PatternModel.findOne({
            name,
        }).populate('contributedBy', '-password -contributions');
        if (!patterns) {
            throw new utils_1.Custom_error({
                errors: [{ message: 'patternNotFound' }],
                statusCode: 404,
            });
        }
        patterns = [patterns];
    }
    else if (your == 'true') {
        if (!search)
            search = "";
        search = unicodeToChar(search);
        const regex = new RegExp(`^${search}`, 'i');
        patterns = await pattern_1.PatternModel.find({
            name: { $regex: regex },
            contributedBy: req.user._id,
        })
            .select('-grid')
            .populate('contributedBy', '-password -contributions');
    }
    else {
        let quer = {};
        if (search) {
            search = unicodeToChar(search);
            const regex = new RegExp(`^${search}`, 'i');
            quer = { name: { $regex: regex } };
        }
        patterns = await pattern_1.PatternModel.find(quer)
            .select('-grid')
            .populate('contributedBy', '-password -contributions');
        if (!search)
            patterns.reverse();
    }
    const response = new utils_1.Custom_response(true, null, patterns, 'success', 200, null);
    res.json(response);
});
exports.default = getPattern;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@himanshu_guptaorg/utils");
const user_1 = require("../models/user");
const signUp = (0, utils_1.async_error_handler)(async (req, res, next) => {
    const { name, password } = req.body;
    if (!name || !password) {
        throw new utils_1.Custom_error({
            errors: [{ message: 'sendCompleteInfo' }],
            statusCode: 400,
        });
    }
    const existingUser = await user_1.UserModel.findOne({ name });
    if (existingUser) {
        throw new utils_1.Custom_error({
            errors: [{ message: 'nameAlreadyExists' }],
            statusCode: 400,
        });
    }
    const hashedPass = await (0, utils_1.hashPassword)(password);
    let user = await user_1.UserModel.build({ name, password: hashedPass }).save();
    const token = await (0, utils_1.createJwt)({ payload: { _id: user._id }, options: {} }, process.env.JWT_SECRET);
    const response = new utils_1.Custom_response(true, null, { token, name }, 'success', 201, null);
    res.json(response);
});
exports.default = signUp;

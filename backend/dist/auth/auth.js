"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@himanshu_guptaorg/utils");
const user_1 = require("../models/user");
const authenticateUser = (0, utils_1.async_error_handler)(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (req.url.startsWith('/patterns') &&
        !(req.query.your &&
            req.query.your == 'true')) {
        next();
        return;
    }
    if (!token) {
        throw new utils_1.Custom_error({
            errors: [{ message: 'TokenMissing' }],
            statusCode: 401,
        });
    }
    const decoded = (await (0, utils_1.jwtVerification)(token, process.env.JWT_SECRET));
    if (!decoded) {
        throw new utils_1.Custom_error({
            errors: [{ message: 'InvalidToken' }],
            statusCode: 401,
        });
    }
    const user = await user_1.UserModel.findById(decoded._id);
    if (!user)
        throw new utils_1.Custom_error({
            errors: [{ message: 'NoSuchUser' }],
            statusCode: 404,
        });
    req.user = user;
    next();
});
exports.default = authenticateUser;

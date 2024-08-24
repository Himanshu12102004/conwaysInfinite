"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@himanshu_guptaorg/utils");
const isLoggedIn = (0, utils_1.async_error_handler)(async (req, res, next) => {
    console.log(req.user);
    const response = new utils_1.Custom_response(true, null, { user: req.user }, 'success', 201, null);
    res.json(response);
});
exports.default = isLoggedIn;

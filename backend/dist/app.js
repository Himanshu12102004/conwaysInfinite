"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const utils_1 = require("@himanshu_guptaorg/utils");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./routers/router"));
const auth_1 = __importDefault(require("./auth/auth"));
const contribute_1 = __importDefault(require("./controllers/contribute"));
const signup_1 = __importDefault(require("./controllers/signup"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 1000 * 60,
    max: 4,
});
app.use(express_1.default.json());
app.use('/api/v1', router_1.default);
app.use(limiter);
router_1.default.route('/contribute').post(auth_1.default, contribute_1.default);
router_1.default.route('/signup').post(signup_1.default);
app.all('*', (req, res, next) => {
    const err = new utils_1.Custom_error({
        errors: [{ message: 'pageNotFound' }],
        statusCode: 404,
    });
    next(err);
});
app.use(utils_1.error_middleware);

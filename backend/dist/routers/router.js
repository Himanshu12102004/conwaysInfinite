"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../controllers/login"));
const auth_1 = __importDefault(require("../auth/auth"));
const getPattern_1 = __importDefault(require("../controllers/getPattern"));
const isLoggedIn_1 = __importDefault(require("../controllers/isLoggedIn"));
const router = (0, express_1.Router)();
router.route('/login').post(login_1.default);
router.route('/patterns').get(auth_1.default, getPattern_1.default);
router.route('/isLoggedIn').get(auth_1.default, isLoggedIn_1.default);
exports.default = router;

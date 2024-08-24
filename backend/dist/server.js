"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const utils_1 = require("@himanshu_guptaorg/utils");
dotenv_1.default.config({ path: '.env' });
const init = async () => {
    try {
        if (!process.env.MONGO_URI)
            throw new utils_1.Custom_error({
                errors: [{ message: 'MONGO_URINotFound' }],
                statusCode: 500,
            });
        await mongoose_1.default.connect(process.env.MONGO_URI);
        app_1.app.listen(process.env.PORT, async () => {
            console.log('Server started!!!!!!');
        });
    }
    catch (err) {
        console.error(err);
    }
};
init();

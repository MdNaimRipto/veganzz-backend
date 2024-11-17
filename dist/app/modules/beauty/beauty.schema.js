"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beauty = void 0;
const mongoose_1 = require("mongoose");
const beautyConstant_1 = require("./beautyConstant");
const beautySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    status: {
        type: String,
        enum: beautyConstant_1.StatusEnums,
        required: true,
        default: "PUBLISHED",
    },
});
exports.Beauty = (0, mongoose_1.model)("Beauty", beautySchema);

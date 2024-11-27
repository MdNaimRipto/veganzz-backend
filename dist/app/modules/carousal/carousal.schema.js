"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carousal = void 0;
const mongoose_1 = require("mongoose");
const carousal_constant_1 = require("./carousal.constant");
const carousalSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: carousal_constant_1.CarousalStatusEnums,
        required: true,
        default: "PAUSED",
    },
});
exports.Carousal = (0, mongoose_1.model)("Carousal", carousalSchema);

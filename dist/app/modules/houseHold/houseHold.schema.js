"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseHold = void 0;
const mongoose_1 = require("mongoose");
const houseHold_constant_1 = require("./houseHold.constant");
const houseHoldSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    status: {
        type: String,
        enum: houseHold_constant_1.StatusEnums,
        required: true,
        default: "PUBLISHED",
    },
});
exports.HouseHold = (0, mongoose_1.model)("HouseHold", houseHoldSchema);

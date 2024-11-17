"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Travels = void 0;
const mongoose_1 = require("mongoose");
const travel_contstant_1 = require("./travel.contstant");
const travelsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    state: { type: String, required: true },
    description: { type: String, required: true },
    watchOutFor: { type: String, required: true },
    status: {
        type: String,
        enum: travel_contstant_1.StatusEnums,
        required: true,
        default: "PUBLISHED",
    },
});
exports.Travels = (0, mongoose_1.model)("Travels", travelsSchema);

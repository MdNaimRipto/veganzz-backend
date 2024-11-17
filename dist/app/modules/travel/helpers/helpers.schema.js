"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelHelpers = void 0;
const mongoose_1 = require("mongoose");
const helpers_contstant_1 = require("./helpers.contstant");
const travelHelpersSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0, min: 0, max: 5 },
    totalRating: { type: Number, required: true, default: 0, min: 0 },
    category: {
        type: String,
        required: true,
        enum: helpers_contstant_1.TravelHelperCategoryEnumsTypesEnums,
    },
    helperFor: { type: mongoose_1.Types.ObjectId, required: true, ref: "Travels" },
});
exports.TravelHelpers = (0, mongoose_1.model)("TravelHelpers", travelHelpersSchema);

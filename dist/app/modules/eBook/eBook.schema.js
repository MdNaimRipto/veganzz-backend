"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBook = void 0;
const mongoose_1 = require("mongoose");
const eBook_constant_1 = require("./eBook.constant");
const eBookSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    subDescription: { type: String, required: true },
    mainDescription: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    status: {
        type: String,
        enum: eBook_constant_1.StatusEnums,
        required: true,
        default: "PUBLISHED",
    },
    productType: {
        type: String,
        enum: eBook_constant_1.EBookTypeEnums,
        required: true,
    },
    pdf: { type: String, required: false, default: null },
    dateAdded: { type: String, required: true },
});
exports.EBook = (0, mongoose_1.model)("EBook", eBookSchema);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeautyService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const beauty_schema_1 = require("./beauty.schema");
const uploadBeauty = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield beauty_schema_1.Beauty.create(payload);
    return result;
});
const getAllBeauty = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield beauty_schema_1.Beauty.find({});
    return result;
});
const updateBeauty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield beauty_schema_1.Beauty.findOne({ _id: id });
    if (!isProductExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product Not Found!");
    }
    const result = yield beauty_schema_1.Beauty.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteBeauty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBeautyExists = yield beauty_schema_1.Beauty.findOne({ _id: id });
    if (!isBeautyExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Beauty Not Found");
    }
    const result = yield beauty_schema_1.Beauty.findOneAndDelete({ _id: id }, {
        new: true,
    });
    return result;
});
exports.BeautyService = {
    uploadBeauty,
    getAllBeauty,
    updateBeauty,
    deleteBeauty,
};

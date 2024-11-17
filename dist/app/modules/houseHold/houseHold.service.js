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
exports.HouseHoldService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const houseHold_schema_1 = require("./houseHold.schema");
const uploadHouseHold = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield houseHold_schema_1.HouseHold.create(payload);
    return result;
});
const getAllHouseHold = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield houseHold_schema_1.HouseHold.find({});
    return result;
});
const updateHouseHold = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield houseHold_schema_1.HouseHold.findOne({ _id: id });
    if (!isProductExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product Not Found!");
    }
    const result = yield houseHold_schema_1.HouseHold.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.HouseHoldService = {
    uploadHouseHold,
    getAllHouseHold,
    updateHouseHold,
};

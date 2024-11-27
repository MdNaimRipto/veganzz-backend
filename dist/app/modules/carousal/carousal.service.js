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
exports.CarousalService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const carousal_schema_1 = require("./carousal.schema");
const uploadCarousal = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carousal_schema_1.Carousal.create(payload);
    return result;
});
const getAllCarousals = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carousal_schema_1.Carousal.find({});
    return result;
});
const getActiveCarousals = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carousal_schema_1.Carousal.find({ status: "ACTIVE" });
    return result;
});
const updateCarousal = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCarousalExists = yield carousal_schema_1.Carousal.findOne({ _id: id });
    if (!isCarousalExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Carousal Not Found");
    }
    if (payload.status) {
        const status = payload.status;
        console.log(status);
        if (status !== "ACTIVE" && status !== "PAUSED") {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Status Must Be Active or Paused!");
        }
    }
    const result = yield carousal_schema_1.Carousal.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteCarousal = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isCarousalExists = yield carousal_schema_1.Carousal.findOne({ _id: id });
    if (!isCarousalExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Carousal Not Found");
    }
    const result = yield carousal_schema_1.Carousal.findOneAndDelete({ _id: id }, {
        new: true,
    });
    return result;
});
exports.CarousalService = {
    uploadCarousal,
    getAllCarousals,
    getActiveCarousals,
    updateCarousal,
    deleteCarousal,
};

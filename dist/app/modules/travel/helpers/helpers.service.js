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
exports.TravelHelpersService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const helpers_schema_1 = require("./helpers.schema");
const ApiError_1 = __importDefault(require("../../../../errors/ApiError"));
const travel_schema_1 = require("../travel.schema");
const uploadTravelHelpers = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, totalRating, helperFor } = payload;
    if (rating !== undefined || totalRating !== undefined) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to Upload! Please Try Again.");
    }
    const isTravelLocationExists = yield travel_schema_1.Travels.findOne({ _id: helperFor });
    if (!isTravelLocationExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Travel Location Dose Not Exists!");
    }
    const result = yield helpers_schema_1.TravelHelpers.create(payload);
    return result;
});
const getAllTravelHelpers = (travelId, category) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield helpers_schema_1.TravelHelpers.find({
        $and: [{ helperFor: travelId }, { category }],
    }).populate({
        path: "helperFor",
        select: "name _id",
    });
    return result;
});
const updateTravelHelper = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, totalRating, helperFor, category } = payload;
    if (rating !== undefined ||
        totalRating !== undefined ||
        helperFor !== undefined ||
        category !== undefined) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to Upload! Please Try Again.");
    }
    const isHelperExists = yield helpers_schema_1.TravelHelpers.findOne({ _id: id });
    if (!isHelperExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Helper Not Found!");
    }
    const result = yield helpers_schema_1.TravelHelpers.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteTravelHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isTravelHelperExists = yield helpers_schema_1.TravelHelpers.findOne({ _id: id });
    if (!isTravelHelperExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Travel Helper Not Found");
    }
    const result = yield helpers_schema_1.TravelHelpers.findOneAndDelete({ _id: id }, {
        new: true,
    });
    return result;
});
exports.TravelHelpersService = {
    uploadTravelHelpers,
    getAllTravelHelpers,
    updateTravelHelper,
    deleteTravelHelper,
};

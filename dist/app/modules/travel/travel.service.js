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
exports.TravelsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const travel_schema_1 = require("./travel.schema");
const helpers_schema_1 = require("./helpers/helpers.schema");
const uploadTravels = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield travel_schema_1.Travels.create(payload);
    return result;
});
const getAllTravelLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield travel_schema_1.Travels.find({});
    return result;
});
const getTravelLocationDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield travel_schema_1.Travels.findOne({ _id: id });
    return result;
});
const updateTravelLocations = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isLocationExists = yield travel_schema_1.Travels.findOne({ _id: id });
    if (!isLocationExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Location Not Found!");
    }
    const result = yield travel_schema_1.Travels.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteTravel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield travel_schema_1.Travels.startSession();
    session.startTransaction();
    try {
        const isTravelExists = yield travel_schema_1.Travels.findById(id).session(session);
        if (!isTravelExists) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Travel Not Found");
        }
        const result = yield travel_schema_1.Travels.findByIdAndDelete(id, { session });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to delete travel");
        }
        yield helpers_schema_1.TravelHelpers.deleteMany({ helperFor: id }).session(session);
        yield session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.TravelsService = {
    uploadTravels,
    getAllTravelLocations,
    getTravelLocationDetails,
    updateTravelLocations,
    deleteTravel,
};

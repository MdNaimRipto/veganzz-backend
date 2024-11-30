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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const eBook_schema_1 = require("./eBook.schema");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const uploadEBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield eBook_schema_1.EBook.create(payload);
    return result;
});
const getAllEBook = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const andConditions = [];
    if (Object.keys(filters).length) {
        andConditions.push({
            $and: Object.entries(filters).map(([field, value]) => {
                return { [field]: value };
            }),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePaginationFunction)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const checkAndCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const result = yield eBook_schema_1.EBook.find(checkAndCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield eBook_schema_1.EBook.countDocuments(checkAndCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateEBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield eBook_schema_1.EBook.findOne({ _id: id });
    if (!isProductExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product Not Found!");
    }
    const { productType, dateAdded } = payload, restPayload = __rest(payload, ["productType", "dateAdded"]);
    if (productType !== undefined || dateAdded !== undefined) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Type And Date Added cannot be updatable");
    }
    const updatablePayload = restPayload;
    const result = yield eBook_schema_1.EBook.findOneAndUpdate({ _id: id }, updatablePayload, {
        new: true,
    });
    return result;
});
const deleteEBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isEBookExists = yield eBook_schema_1.EBook.findOne({ _id: id });
    if (!isEBookExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "EBook Not Found");
    }
    const result = yield eBook_schema_1.EBook.findOneAndDelete({ _id: id }, {
        new: true,
    });
    return result;
});
exports.EBookService = {
    uploadEBook,
    getAllEBook,
    updateEBook,
    deleteEBook,
};

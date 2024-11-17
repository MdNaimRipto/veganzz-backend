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
exports.recipesService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const recipes_schema_1 = require("./recipes.schema");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const uploadRecipe = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { ingredients, preparationSteps } = payload;
    if (!ingredients.length) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Ingredients Cannot be Empty!");
    }
    if (!preparationSteps.length) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Preparation Steps Cannot be Empty!");
    }
    const result = yield recipes_schema_1.Recipes.create(payload);
    return result;
});
const getAllRecipes = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield recipes_schema_1.Recipes.find(checkAndCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield recipes_schema_1.Recipes.countDocuments(checkAndCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getRecipeDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipes_schema_1.Recipes.findOne({ _id: id });
    return result;
});
const updateRecipe = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isRecipeExists = yield recipes_schema_1.Recipes.findOne({ _id: id });
    if (!isRecipeExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Recipe Not Found!");
    }
    const { ingredients, preparationSteps, tips } = payload, restPayload = __rest(payload, ["ingredients", "preparationSteps", "tips"]);
    const updatablePayload = restPayload;
    if (ingredients) {
        updatablePayload.ingredients = ingredients;
    }
    if (preparationSteps) {
        updatablePayload.preparationSteps = preparationSteps;
    }
    if (tips) {
        updatablePayload.tips = tips;
    }
    const result = yield recipes_schema_1.Recipes.findOneAndUpdate({ _id: id }, updatablePayload, {
        new: true,
    });
    return result;
});
exports.recipesService = {
    uploadRecipe,
    getAllRecipes,
    getRecipeDetails,
    updateRecipe,
};

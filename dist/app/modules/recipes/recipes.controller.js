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
exports.recipesController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const recipes_service_1 = require("./recipes.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const recipes_contstant_1 = require("./recipes.contstant");
const shared_1 = __importDefault(require("../../../shared/shared"));
const pagination_constant_1 = require("../../../constants/pagination.constant");
// Upload Recipe
const uploadRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = __rest(req.body, []);
    const result = yield recipes_service_1.recipesService.uploadRecipe(recipe);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Recipe Uploaded Successfully",
        data: result,
    });
}));
// Upload Recipe
const getAllRecipes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, shared_1.default)(req.query, recipes_contstant_1.RecipesFilterableFields);
    const options = (0, shared_1.default)(req.query, pagination_constant_1.paginationFields);
    const result = yield recipes_service_1.recipesService.getAllRecipes(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Recipes Retrieved Successfully",
        data: result,
    });
}));
// Upload Recipe
const getRecipeDetails = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield recipes_service_1.recipesService.getRecipeDetails(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Recipe Retrieved Successfully",
        data: result,
    });
}));
// Upload Recipe
const updateRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const recipe = __rest(req.body, []);
    const result = yield recipes_service_1.recipesService.updateRecipe(id, recipe);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Recipe Updated Successfully",
        data: result,
    });
}));
// Delete
const deleteRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield recipes_service_1.recipesService.deleteRecipe(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Recipe Deleted Successfully",
        data: result,
    });
}));
exports.recipesController = {
    uploadRecipe,
    getAllRecipes,
    getRecipeDetails,
    updateRecipe,
    deleteRecipe,
};

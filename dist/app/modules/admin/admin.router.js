"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.get("/userCounts", admin_controller_1.AdminController.userCounts);
router.get("/reviewCounts", admin_controller_1.AdminController.reviewCounts);
router.get("/orderCounts", admin_controller_1.AdminController.orderCounts);
exports.AdminRouter = router;

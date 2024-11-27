"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBookRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../middlewares/zodValidationRequest"));
const eBook_validation_1 = require("./eBook.validation");
const eBook_controller_1 = require("./eBook.controller");
const router = express_1.default.Router();
router.post("/uploadEBook", (0, zodValidationRequest_1.default)(eBook_validation_1.EBookValidation.uploadEBookZodSchema), eBook_controller_1.EBookController.uploadEBook);
router.get("/getAllEBook", eBook_controller_1.EBookController.getAllEBook);
router.patch("/updateEBook/:id", eBook_controller_1.EBookController.updateEBook);
router.delete("/deleteEBook/:id", eBook_controller_1.EBookController.deleteEBook);
exports.EBookRouter = router;

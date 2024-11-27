import express from "express";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { EBookValidation } from "./eBook.validation";
import { EBookController } from "./eBook.controller";

const router = express.Router();

router.post(
  "/uploadEBook",
  zodValidationRequest(EBookValidation.uploadEBookZodSchema),
  EBookController.uploadEBook,
);

router.get("/getAllEBook", EBookController.getAllEBook);

router.patch("/updateEBook/:id", EBookController.updateEBook);

router.delete("/deleteEBook/:id", EBookController.deleteEBook);

export const EBookRouter = router;

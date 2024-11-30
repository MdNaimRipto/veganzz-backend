import express from "express";
import zodValidationRequest from "../../../middlewares/zodValidationRequest";
import { WishlistValidation } from "./wishlist.validation";
import { WishlistsController } from "./wishlist.controller";

const router = express.Router();

router.post(
  "/uploadWishlist",
  zodValidationRequest(WishlistValidation.uploadWishlistZodSchema),
  WishlistsController.uploadWishlist,
);

router.get("/getUserWishlists/:userId", WishlistsController.getUserWishlists);

router.get("/isAddedWishlist", WishlistsController.isAddedWishlist);

router.delete("/deleteWishlist/:id", WishlistsController.deleteWishlist);

export const WishlistRouter = router;

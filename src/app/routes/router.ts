import express from "express";
import { UserRouter } from "../modules/users/users.router";
import { RecipesRouter } from "../modules/recipes/recipes.router";
import { TravelsRouter } from "../modules/travel/travel.router";
import { HelpersRouter } from "../modules/travel/helpers/helpers.router";
import { BeautyRouter } from "../modules/beauty/beauty.router";
import { ReviewsRouter } from "../modules/reviews/reviews.router";
import { BookingsRouter } from "../modules/booking/booking.router";
import { HouseHoldRouter } from "../modules/houseHold/houseHold.router";
import { EBookRouter } from "../modules/eBook/eBook.router";
import { CarousalRouter } from "../modules/carousal/carousal.router";
import { StripeRouter } from "../modules/stripe/stripe.router";
import { OrdersRouter } from "../modules/order/order.router";

const router = express.Router();

const routes = [
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/recipes",
    route: RecipesRouter,
  },
  {
    path: "/beauty",
    route: BeautyRouter,
  },
  {
    path: "/travels",
    route: TravelsRouter,
  },
  {
    path: "/travels/helpers",
    route: HelpersRouter,
  },
  {
    path: "/reviews",
    route: ReviewsRouter,
  },
  {
    path: "/bookings",
    route: BookingsRouter,
  },
  {
    path: "/houseHold",
    route: HouseHoldRouter,
  },
  {
    path: "/e-book",
    route: EBookRouter,
  },
  {
    path: "/carousal",
    route: CarousalRouter,
  },
  {
    path: "/stripe",
    route: StripeRouter,
  },
  {
    path: "/order",
    route: OrdersRouter,
  },
];

routes.map(r => router.use(r.path, r.route));

export const Routers = router;

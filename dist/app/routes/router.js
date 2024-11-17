"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routers = void 0;
const express_1 = __importDefault(require("express"));
const users_router_1 = require("../modules/users/users.router");
const recipes_router_1 = require("../modules/recipes/recipes.router");
const travel_router_1 = require("../modules/travel/travel.router");
const helpers_router_1 = require("../modules/travel/helpers/helpers.router");
const beauty_router_1 = require("../modules/beauty/beauty.router");
const reviews_router_1 = require("../modules/reviews/reviews.router");
const booking_router_1 = require("../modules/booking/booking.router");
const houseHold_router_1 = require("../modules/houseHold/houseHold.router");
const eBook_router_1 = require("../modules/eBook/eBook.router");
const router = express_1.default.Router();
const routes = [
    {
        path: "/users",
        route: users_router_1.UserRouter,
    },
    {
        path: "/recipes",
        route: recipes_router_1.RecipesRouter,
    },
    {
        path: "/beauty",
        route: beauty_router_1.BeautyRouter,
    },
    {
        path: "/travels",
        route: travel_router_1.TravelsRouter,
    },
    {
        path: "/travels/helpers",
        route: helpers_router_1.HelpersRouter,
    },
    {
        path: "/reviews",
        route: reviews_router_1.ReviewsRouter,
    },
    {
        path: "/bookings",
        route: booking_router_1.BookingsRouter,
    },
    {
        path: "/houseHold",
        route: houseHold_router_1.HouseHoldRouter,
    },
    {
        path: "/e-book",
        route: eBook_router_1.EBookRouter,
    },
];
routes.map(r => router.use(r.path, r.route));
exports.Routers = router;

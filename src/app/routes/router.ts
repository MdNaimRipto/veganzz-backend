import express from "express";
import { UserRouter } from "../modules/users/users.router";
import { RecipesRouter } from "../modules/recipes/recipes.router";
import { TravelsRouter } from "../modules/travel/travel.router";
import { HelpersRouter } from "../modules/travel/helpers/helpers.router";

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
    path: "/travels",
    route: TravelsRouter,
  },
  {
    path: "/travels/helpers",
    route: HelpersRouter,
  },
];

routes.map(r => router.use(r.path, r.route));

export const Routers = router;

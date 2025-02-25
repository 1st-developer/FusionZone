import { RequestHandler, Router } from "express";
import { searchPost } from "../controllers/search.controller";

const searchRouter = Router();

searchRouter.get("/list", searchPost as RequestHandler);

export default searchRouter;

import { RequestHandler, Router } from "express";
import { searchPost } from "../controllers/search.controller";

const searchRouter = Router();

searchRouter.get("/list/:name", searchPost as RequestHandler);

export default searchRouter;

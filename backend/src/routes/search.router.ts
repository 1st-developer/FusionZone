import { Router } from "express";
import { searchPost } from "../controllers/search.controller";

const searchRouter = Router();

searchRouter.get("/list/:name", searchPost);

export default searchRouter;

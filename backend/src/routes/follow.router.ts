import { Router } from "express";
import { createFollow, deleteMyFollowing, getAllMyFollwing } from "../controllers/follow.controller";
import { authenticate } from "../validations/authenticate";
import { followSchema } from "../schema/follow.schema";
import { validationMiddleWere } from "../validations/validation.middlewere";
const followRouter = Router();

followRouter.post("/create", authenticate, followSchema, validationMiddleWere, createFollow);
followRouter.get("/list", authenticate, getAllMyFollwing);
followRouter.delete("/delete", authenticate, deleteMyFollowing);

export default followRouter;


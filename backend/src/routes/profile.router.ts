import { Router } from "express";
import { updateProfile } from "../controllers/profile.controller";
import { validationMiddleWere } from "../validations/validation.middlewere";
import { profileSchema } from "../schema/profile.schema";
const profileRouter = Router();

profileRouter.put("/update", profileSchema, validationMiddleWere, updateProfile)


export default profileRouter;
import { Router } from "express";
import { updateProfile } from "../controllers/profile.controller";
import { validationMiddleWere } from "../validations/validation.middlewere";
import { profileSchema } from "../schema/profile.schema";
import { authenticate } from "../validations/authenticate";
const profileRouter = Router();

profileRouter.put("/update", authenticate, profileSchema, validationMiddleWere, updateProfile)


export default profileRouter;
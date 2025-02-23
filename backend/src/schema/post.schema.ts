import { body } from "express-validator";



export const postSchema = ([
    body("user_Id").isNumeric().withMessage("user_Id is required"),
    body("name").isString().isLength({min: 1, max: 22}).withMessage("name must be at least 1 characters and at most 22 characters"),
    body("state").isString().isLength({min: 7}).withMessage("state must have be 7 characters"),
    body("profile").isString().withMessage("no profile")
])
import { body } from "express-validator";



export const postSchema = ([
    body("name").isString().isLength({min: 1, max: 30}).withMessage("name must be at least 1 characters and at most 30 characters"),
    body("profile").isString().withMessage("no profile")
]);
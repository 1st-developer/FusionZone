import { body } from "express-validator";


export const profileSchema = ([
    body("id").isNumeric().withMessage("id is required and must be a number"),
    body("profile").isString().isLength({min: 1, max: 1000}).withMessage("profile is required and must be at least 1000 characters")
])
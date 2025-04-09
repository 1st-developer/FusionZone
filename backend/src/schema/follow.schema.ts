import { body } from "express-validator";


export const followSchema = ([
    body("following_id").isString().withMessage("following_id is required and must be string")
]);
import {body} from "express-validator"

export const RegistrationSchema = ([
    body("full_name").isString().isLength({min: 4, max: 64}).withMessage("full_name must have at least 4 characters! and at most 64 characters!"),
    body("email").isEmail().withMessage("Valid email address!"),
    body("password").isLength({min: 8, max: 100}).withMessage("password must have at least 8 characters! and at most 100 characters!"),
    body("confirm_password").isLength({min: 8, max: 100}).withMessage("confirm_password must have at least 8 characters! and at most 100 characters!"),
]);

export const LoginSchema = ([
    body("email").isEmail().withMessage("Valid email address!"),
    body("password").isLength({min: 8, max: 100}).withMessage("password must have at least 8 characters! and at most 100 characters!")
]);
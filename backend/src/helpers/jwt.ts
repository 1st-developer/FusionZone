import jwt from "jsonwebtoken"
const key = process.env.JWT_SECRET_KEY;

export const generateToken = (userId: string) => {
    return jwt.sign({userId}, key as string, {
        expiresIn: "2h"
    });
}

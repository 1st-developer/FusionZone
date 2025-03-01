import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { serverError } from "../error.messages";
import { AuthRequest } from "../types/request";
const prisma = new PrismaClient();



export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {

        const updated = await prisma.users.update({
            where: {
                id: req.userId
            },
            data: {
                profile: req.body.profile
            }
        });

        const {password, ...rest} = updated;

        res.status(201).json({
            isSuccess: true,
            Message: "Profile Updated Successfully",
            Profile: rest
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError
        });
    }
}
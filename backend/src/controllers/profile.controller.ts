import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { serverError } from "../error.messages";
import { IUpdateProfile } from "../types/profile.type";
const prisma = new PrismaClient();



export const updateProfile = async (req: Request, res: Response) => {
    try {

        const {id, profile}: IUpdateProfile = req.body;

        const updated = await prisma.users.update({
            where: {
                id: id
            },
            data: {
                profile: profile
            }
        });

        res.status(201).json({
            isSuccess: true,
            Message: "Profile Updated Successfully",
            Profile: updated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError
        });
    }
}
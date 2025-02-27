import { Request, Response } from "express";
import { serverError } from "../error.messages";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const searchPost = async (req: Request, res: Response) => {
    try {
        const { name } = req.params; 

        if (!name || typeof name !== "string") {
            return res.status(400).json({
                isSuccess: false,
                Message: "name is required and must be a string"
            });
        }

        const findPost = await prisma.posts.findMany({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive"
                }
            }
        });

        if (!findPost) {
            return res.status(404).json({
                isSuccess: false,
                Message: "Post not found!"
            });
        }

        res.status(200).json({
            isSuccess: true,
            Message: "Successfully retrieved",
            posts: findPost
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError
        });
    }
};

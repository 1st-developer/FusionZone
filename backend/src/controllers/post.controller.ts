import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { notFound, serverError } from "../error.messages";
import { PostResponse } from "../types/post.type";
const prisma = new PrismaClient();



export const createPost = async (req: Request, res: Response) => {
    try {

        const data: PostResponse = req.body;

        const user = await prisma.users.findFirst({
            where: {
                id: data.user_Id
            }
        });

        if(!user) {
            res.status(400).json({
                isSuccess: false,
                Message: notFound
            });

            return;
        }

        const post = await prisma.posts.create({
            data: {
                user_Id: data.user_Id,
                profile: data.profile,
                name: data.name,
                state: data.state
            }
        });

        res.status(201).json({
            isSuccess: false,
            Message: "Post Created Successfully",
            post: post
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError
        });
    }
}


export const getAllPost = async (req: Request, res: Response) => {
    try {

        const post = await prisma.posts.findMany();

        res.status(201).json({
            isSuccess: false,
            Message: "Successfully received",
            post: post
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError
        });
    }
}
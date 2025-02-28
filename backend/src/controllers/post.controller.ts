import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { notFound, serverError } from "../error.messages";
import { PostResponse } from "../types/post.type";
import { AuthRequest } from "../types/request";
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
                name: data.name.toLowerCase(),
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

        const post = await prisma.posts.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        full_name: true
                    }
                }
            }
        });

        res.status(201).json({
            isSuccess: true,
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

export const MyPosts = async (req: AuthRequest, res: Response) => {
    try {

        const findPost = await prisma.posts.findMany({
            where: {
                user_Id: req.userId
            }
        });
        
        res.status(201).json({
            iSuccess: true,
            Message: "Successfully received!",
            user: req.userId,
            posts: findPost
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError
        });
    }
}
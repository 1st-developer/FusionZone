import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { serverError } from "../error.messages";
import { PostResponse } from "../types/post.type";
import { AuthRequest } from "../types/request";
const prisma = new PrismaClient();



export const createPost = async (req: AuthRequest, res: Response) => {
    try {

        const data: PostResponse = req.body;
        const user_Id = req.userId;

        const post = await prisma.posts.create({
            data: {
                profile: data.profile,
                name: data.name.toLowerCase(),
                user_Id: user_Id!
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

export const getOtherPosts = async (req: Request, res: Response) => {
    try {

        const user_Id = req.params.user_Id;

        const findPost = await prisma.posts.findMany({
            where: {
                user_Id: user_Id
            }
        });

        if(!findPost) {
            res.status(400).json({
                isSuccess: false,
                Message: "Post not found!"
            });

            return;
        }

        res.status(200).json({
            isSuccess: true,
            Message: "Successfully received",
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


export const deletePost = async (req: AuthRequest, res: Response) => {
    try {

        const {id} = req.params;

        const findPost = await prisma.posts.findFirst({
            where: {
                id: id
            }
        });

        if(!findPost) {
            res.status(400).json({
                isSuccess: false,
                Message: "Post not found!"
            });

            return;
        }

        await prisma.posts.delete({
            where: {
                id: findPost?.id
            }
        });

        res.status(201).json({
            isSuccess: true,
            Message: "Successfully delete the post"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError
        });
    }
}
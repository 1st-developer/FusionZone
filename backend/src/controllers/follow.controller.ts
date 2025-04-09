import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../types/request";
import { Response } from "express";
const prisma = new PrismaClient();

export const createFollow = async(req: AuthRequest, res: Response) => {
    try {

    const {following_id} = req.body;

    if (req.userId === following_id) {
       res.status(400).json({
        isSuccess: false,
        message: "Can't follow yourself",
      });

      return;
    }

    const existingFollow = await prisma.follow.findFirst({
      where: {
        follower_id: req.userId,
        following_id: following_id,
      },
    });

    if (existingFollow) {
       res.status(400).json({
        isSuccess: false,
        message: "You already follow this user",
      });

      return;
    }

    const follow = await prisma.follow.create({
      data: {
        follower_id: req.userId!,
        following_id: following_id,
      }
    });

    const user = await prisma.users.findFirst({
      where: {
        id: follow.following_id
      }
    });

    if(!user) {
      res.status(404).json({
        isSuccess: false,
        Message: "User not found!"
      });

      return;
    }

    const {password, ...rest} = user;

    res.status(201).json({
      isSuccess: true,
      message: "Followed successfully",
      follow: rest
    });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            isSuccess: false,
            message: "Server error"
        });
    }
}

export const getAllMyFollwing = async(req: AuthRequest, res: Response) => {
    try {

        const myfollowing = await prisma.follow.findMany({
            where: {
                follower_id: req.userId
            }
        });

        const map = myfollowing.map((u) => u.following_id);

        const users = await prisma.users.findMany({
            where: {
              id: {
                in: map
              },
            },
            select: {
              id: true,
              full_name: true,
              email: true,
              profile: true
            },
          });

        res.status(200).json({
            isSuccess: true,
            Message: "your following",
            following: users
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            isSuccess: false,
            message: "Server error"
        });
    }
}

export const deleteMyFollowing = async (req: AuthRequest, res: Response) => {
  try {
    const { following_id } = req.body;

    const existingFollow = await prisma.follow.findFirst({
      where: {
        follower_id: req.userId,
        following_id: following_id
      }
    });

    if (!existingFollow) {
      res.status(404).json({
        isSuccess: false,
        message: "You are not following this user"
      });

      return;
    }

    await prisma.follow.deleteMany({
      where: {
        follower_id: req.userId,
        following_id: following_id
      }
    });

    res.status(200).json({
      isSuccess: true,
      message: "Unfollowed successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: "Server error"
    });
  }
}

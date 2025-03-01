import { RequestHandler, Router } from "express";
import { createPost, getAllPost, MyPosts } from "../controllers/post.controller";
import { postSchema } from "../schema/post.schema";
import { validationMiddleWere } from "../validations/validation.middlewere";
import { authenticate } from "../validations/authenticate";
const postRouter = Router();

postRouter.post("/create", authenticate,  postSchema, validationMiddleWere, createPost);
postRouter.get("/list",  getAllPost);
postRouter.get("/my-posts", authenticate, MyPosts);


export default postRouter
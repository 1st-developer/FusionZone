import { Router } from "express";
import { createPost, getAllPost } from "../controllers/post.controller";
import { postSchema } from "../schema/post.schema";
import { validationMiddleWere } from "../validations/validation.middlewere";
const postRouter = Router();

postRouter.post("/create",  postSchema, validationMiddleWere, createPost);
postRouter.get("/list",  getAllPost);


export default postRouter
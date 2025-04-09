import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/user.router";
import postRouter from "./routes/post.router";
import searchRouter from "./routes/search.router";
import profileRouter from "./routes/profile.router";
import followRouter from "./routes/follow.router";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:2025"
}));

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/search", searchRouter);
app.use("/api/profile", profileRouter);
app.use("/api/follow", followRouter);



app.listen(PORT, () => console.log(`Server is listning on PORT ${PORT} 😎`));
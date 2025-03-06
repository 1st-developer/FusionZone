import { Button } from "./ui/button"
import "../Styles/createPosts.scss"
import { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createPostFn } from "@/redux/slice/createPost.slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoldenSpinner from "./ui/goldenSpinner";
import { Textarea } from "./ui/textarea";

function CreatePost() {

  const navigate = useNavigate();
  const loginState = useSelector((state: RootState) => state.loginSlice);
  const dispatch = useDispatch<AppDispatch>();

  const [nameInput, setNameInput] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files;
      if (file && file[0]) {
        setLoading(true);
        const data = new FormData();
        data.append("file", file[0]);
        data.append("upload_preset", "my_cloudinary_store");
        data.append("cloud_name", "dytzmdcdt");
  
        const response = await axios.post("https://api.cloudinary.com/v1_1/dytzmdcdt/image/upload", data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        if (response.data.secure_url) {
          setImg(response.data.secure_url);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }; 

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!nameInput || !img) {
        toast.error("Please fill in all fields and upload an image.");
        return;
      }else {
        navigate("/");
      }
      
      dispatch(
        createPostFn({
          token: loginState.data.token,
          profile: img,
          name: nameInput
        }));
  
      toast.success("Successfully created your post");
  
      setNameInput("");
      setImg("");
    };

  return (
    <div className="hole">
      <form onSubmit={handleSubmit}>
      <div className="width">
        <div className="image">
          {loading ? <GoldenSpinner />: img ? <img src={img} />: <h2>no image</h2>}
          <input type="file" accept="image/*" ref={fileInputRef} onChange={upload} style={{ display: "none" }} />
          <Button className="upload-btn" type="button" onClick={() => fileInputRef.current?.click()}>Upload</Button>
        </div>
        <div className="add">
          <Textarea onChange={(e) => setNameInput(e.target.value)} placeholder="add name" />
        <Button type="submit">Save</Button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
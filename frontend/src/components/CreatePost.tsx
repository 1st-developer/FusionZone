import { Button } from "./ui/button"
import "../Styles/createPosts.scss"
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createPostFn } from "@/redux/slice/createPost.slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoldenSpinner from "./ui/goldenSpinner";
import { Textarea } from "./ui/textarea";
import { Formik, useFormik } from "formik";
import * as yup from "yup"

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
        data.append("upload_preset", "my store");
        data.append("cloud_name", "dytzmdcdt");
  
        const response = await axios.post("https://api.cloudinary.com/v1_1/dytzmdcdt/image/upload", data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        if (response.data.secure_url) {
          formik.setFieldValue("profile", response.data.secure_url);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }; 

  const formik = useFormik({
    initialValues: {
      profile: "",
      name: ""
    },
    onSubmit(values) {
        const data = {
          token: loginState.data.token,
          profile: values.profile,
          name: values.name
        }
        dispatch(createPostFn(data))
        toast.success("Successfully created your post");
        navigate("/");
    },
    validationSchema: yup.object({
      name: yup.string().min(1, "name must at least 1 characters").max(30, "name must be at most 30 characters").required("name is required!"),
      profile: yup.string().required("profile is required!")
    })
});  

  return (
    <div className="hole">
      <form onSubmit={formik.handleSubmit}>
      <div className="width">
        <div className="image">
          {loading ? <GoldenSpinner />: formik.values.profile ? <img src={formik.values.profile} />: <h2>no image</h2>}
          <input type="file" accept="image/*" ref={fileInputRef} onChange={upload} style={{ display: "none" }} />
          <Button disabled={loading} className="upload-btn" type="button" onClick={() => fileInputRef.current?.click()}>Upload</Button>
        </div>
        <p className="text-red-500 font-bold">{formik.errors.profile || formik.touched.profile}</p>
        <div className="add">
          <Textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name="name" placeholder="add name" />
          <p className="text-red-500 font-bold">{formik.errors.name || formik.touched.name}</p>
        <Button type="submit">Save</Button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
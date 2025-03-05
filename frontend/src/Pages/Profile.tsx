import { useEffect, useRef, useState } from "react";
import "../Styles/profile.scss"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { FaPlus } from "react-icons/fa6";
import { updateProfileFn } from "@/redux/slice/profile.slice";
import toast from "react-hot-toast";
import { getMyPostsFn } from "@/redux/slice/my-post.slice";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import CreatePost from "@/components/CreatePost";
import axios from "axios";
import GoldenSpinner from "@/components/ui/goldenSpinner";


function Profile() {

    const dispatch = useDispatch<AppDispatch>();
    const loginState = useSelector((state: RootState) => state.loginSlice);
    const updateProfileState = useSelector((state: RootState) => state.updateProfileSlice);
    const myPostsState = useSelector((state: RootState) => state.getMyPostsSlice);

    const token = loginState.data?.token;
    
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
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    

  useEffect(() => {
    if (img) { 
      toast.success("Profile updated successfully");
      dispatch(updateProfileFn({
        id: loginState.data.user.id,
        profile: img,
        token: loginState.data.token
      }));
    }
    dispatch(getMyPostsFn(token))
  }, [img]); 

  const updated = updateProfileState.data?.Profile || [];
  const user = loginState.data?.user

  return (
    <div className="profile-page">
        <div className="self">
          <div className="back-img">
          {updated.profile ? <img src={updated.profile} />: user.profile ? <img src={user.profile} />: <h2>No Profile</h2>}
          </div>
        <div className="circle">
        {loading ? <GoldenSpinner />: updated ? <img src={updated.profile} />: user.profile ? <img src={user.profile} />: <div className="first-word"><h2>{user.full_name[0].toUpperCase()}</h2></div>}
        <span onClick={() => fileInputRef.current?.click()}><input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={upload} 
        style={{ display: "none" }}
      /><label><FaPlus /></label></span>
        </div>
        <div className="user-detail">
        <div className="user-name">{loginState.data?.user?.full_name}</div>
        <div className="user-email">{loginState.data?.user?.email}</div>
        </div>
        </div>

        <div className="my-post">
          <div className="margin">

          <div className="create-post">
          <Popover>
            <PopoverTrigger><Button>Create</Button></PopoverTrigger>
              <PopoverContent className="w-[22rem]"><CreatePost /></PopoverContent>
          </Popover>
          </div>

          {myPostsState.data?.posts?.map((my) => (
            <div className="every" key={my.id}>
            <div className="image">
              <img src={my.profile} />
            </div>
            <div className="post-details">
              <div className="name">{my.name}</div>
              <div className="together">
                <div className="state">{my.state}</div>
                <div className="tick">⭐ 6.55</div>
              </div>
            </div>
          </div>
          ))}
          </div>
        </div>

    </div>
  )
}

export default Profile
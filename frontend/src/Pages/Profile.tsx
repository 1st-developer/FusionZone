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


function Profile() {

    const dispatch = useDispatch<AppDispatch>();
    const loginState = useSelector((state: RootState) => state.loginSlice);
    const updateProfileState = useSelector((state: RootState) => state.updateProfileSlice);
    const myPostsState = useSelector((state: RootState) => state.getMyPostsSlice);

    const token = loginState.data?.token;
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [img, setImg] = useState("");

    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImage = URL.createObjectURL(e.target.files[0]);
      setImg(newImage); 
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

  return (
    <div className="profile-page">
        <div className="self">
          <div className="back-img">
            {img ? <img src={img} />: <img src={updateProfileState.data?.Profile?.profile} />}
          </div>
        <div className="circle">
        {img ? <img src={img} />: <img src={updateProfileState.data?.Profile?.profile} />}
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
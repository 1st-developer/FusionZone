import { useEffect, useRef, useState } from "react";
import "../Styles/profile.scss"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { FaPlus } from "react-icons/fa6";
import { updateProfileFn } from "@/redux/slice/profile.slice";
import toast from "react-hot-toast";

function Profile() {

    const dispatch = useDispatch<AppDispatch>();
    const loginState = useSelector((state: RootState) => state.loginSlice);
    const updateProfileState = useSelector((state: RootState) => state.updateProfileSlice);

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
            profile: img
        }));
    }
}, [img]); 

  return (
    <div className="profile-page">
        <div className="circle">
            <img src={updateProfileState.data?.Profile?.profile} alt="" />
            <span onClick={() => fileInputRef.current?.click()}><input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={upload} 
        style={{ display: "none" }}
      /><label><FaPlus /></label></span>
        </div>
    </div>
  )
}

export default Profile
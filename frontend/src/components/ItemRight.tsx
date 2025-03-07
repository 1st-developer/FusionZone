import "../Styles/itemRight.scss"
import { Button } from "./ui/button"
import { IoHome, IoLogOut } from "react-icons/io5";
import { IoIosContact } from "react-icons/io";
import { IoMdContact } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { MdAccountBalance } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { LiaDownloadSolid } from "react-icons/lia";
import { Theme } from "./ui/theme";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logout } from "@/redux/Auth/login.slice";
import { useNavigate } from "react-router-dom";

function ItemRight() {

  const navigate = useNavigate();
  const loginState = useSelector((state: RootState) => state.loginSlice);
  const updateProfileState = useSelector((state: RootState) => state.updateProfileSlice);
  const dispatch = useDispatch<AppDispatch>();
  const user = loginState.data?.user
  const profile = updateProfileState.data?.Profile

  const logoutHunddle = () => {
    dispatch(logout());
  }
  
  return (
    <div className="item-right">
      <div className="profile">
        <div onClick={() => navigate("/profile")} className="image">
        {profile?.profile ? <img src={profile.profile} />: user?.profile ? <img src={user.profile} />: <div className="first-word"><h2>{loginState.data?.user?.full_name[0]?.toUpperCase()}</h2></div>}
        </div>
        {user ? <div className="name">{user.full_name}</div>: <div className="name">Your name</div>}
      </div>
      <div className="options">
        <div className="list">
        <Button onClick={() => navigate("/")}><IoHome />Home</Button>
        <Button><IoMdContact />Contact</Button>
        <Button><MdAccountBalance />Account</Button>
        <Button><MdOutlineHistory />History</Button>
        <Button><MdFavorite />Favorite</Button>
        <Button><LiaDownloadSolid />Downloads</Button>
        <Button onClick={() => navigate("/profile")} ><IoIosContact />Profile</Button>
        <Popover>
          <PopoverTrigger><Button><IoMdSettings />Setting</Button></PopoverTrigger>
          <PopoverContent><Theme /></PopoverContent>
        </Popover>
        <Button onClick={logoutHunddle} className="logout"><IoLogOut /> Sign Out</Button>
        </div>
      </div>
    </div>
  )
}

export default ItemRight
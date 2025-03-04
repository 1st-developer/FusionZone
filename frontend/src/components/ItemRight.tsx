import "../Styles/itemRight.scss"
import { Button } from "./ui/button"
import { IoLogOut } from "react-icons/io5";
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
          {profile ? <img src={profile.profile} />: user ? <img src={user.profile} />: <h1>{loginState.data?.user?.full_name[0]?.toUpperCase()}</h1>}
        </div>
        {user ? <div className="name">{user.full_name}</div>: <div className="name">Your name</div>}
      </div>
      <div className="options">
        <div className="list">
        <Button onClick={() => navigate("/")}>Home</Button>
        <Button>About</Button>
        <Button>Contact</Button>
        <Button>Services</Button>
        <Button>Account</Button>
        <Button>News</Button>
        <Button>Popular</Button>
        <Button>Watched</Button>
        <Button>Favorite</Button>
        <Button>Downloads</Button>
        <Button>Profile</Button>
        <Popover>
          <PopoverTrigger><Button>Setting</Button></PopoverTrigger>
          <PopoverContent><Theme /></PopoverContent>
        </Popover>
        <Button onClick={logoutHunddle} className="logout">Logout<IoLogOut /></Button>
        </div>
      </div>
    </div>
  )
}

export default ItemRight
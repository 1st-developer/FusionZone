import "../Styles/itemRight.scss"
import { Button } from "./ui/button"
import { IoLogOutOutline } from "react-icons/io5";
import { Theme } from "./ui/theme";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logout } from "@/redux/Auth/login.slice";

function ItemRight() {
  const loginState = useSelector((state: RootState) => state.loginSlice);
  const dispatch = useDispatch<AppDispatch>();
  const user = loginState.data?.user

  const logoutHunddle = () => {
    dispatch(logout())
    window.location.reload();
  }
  

  return (
    <div className="item-right">
      <div className="profile">
        <div className="image">
          {user ? <img src={user.profile} />: <img src="/img/user.png" />}
        </div>
        {user ? <div className="name">{user.full_name}</div>: <div className="name">Your name</div>}
      </div>
      <div className="options">
        <div className="list">
        <Button>Home</Button>
        <Button>About</Button>
        <Button>Contact</Button>
        <Button>Services</Button>
        <Button>Account</Button>
        <Button>News</Button>
        <Button>Popular</Button>
        <Button>Watched</Button>
        <Button>Favorite</Button>
        <Button>Downloads</Button>
        <Button>Adminators</Button>
        <Popover>
          <PopoverTrigger><Button>Setting</Button></PopoverTrigger>
          <PopoverContent><Theme /></PopoverContent>
        </Popover>
        <Button onClick={logoutHunddle} className="logout">Logout<IoLogOutOutline /></Button>
        </div>
      </div>
    </div>
  )
}

export default ItemRight
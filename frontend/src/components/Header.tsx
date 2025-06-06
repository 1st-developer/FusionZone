import { useState } from "react";
import ItemRight from "./ItemRight";
import "../Styles/Header.scss"
import { BiSolidBellRing } from "react-icons/bi";
import { BiSolidBellOff } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { searchFn } from "@/redux/slice/search.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

const SHEET_SIDES = ["left"] as const
type Header = (typeof SHEET_SIDES)[number]


function Header() {

  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector((state: RootState) => state.loginSlice);
  const updateProfileState = useSelector((state: RootState) => state.updateProfileSlice);

  const user = loginState.data?.user
  const profile = updateProfileState.data?.Profile

  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [bell, setBell] = useState(false);
  
  const toggleBell = () => {
    setBell((prev) => {
      const newState = !prev;
      toast.dismiss();
      if (newState) {
        toast.success("You will be notified about new posts");
      } else {
        toast.error("You will not be notified about new posts");
      }
      return newState;
    });
  };
  
  

  return (
    <header className="bg-white dark:bg-black">
        <div className="left">
        <Link to="/profile">
        <div className="profile" style={{border: profile?.profile ? "none": user?.profile ? "none": "1px solid #bbb"}}>
         {profile?.profile ?  <img src={profile.profile} /> : user?.profile ?  <img src={user.profile} />: <h2>{user?.full_name[0]?.toUpperCase()}</h2>}
        </div>
        </Link>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) {
            dispatch(searchFn(name));
            navigate(`/search/${name}`);}}}>
        <div className="input-box">
          <button type="submit"><IoMdSearch /></button>
          <input onChange={(e) => setName(e.target.value)} value={name} type="search" placeholder="Search..."/>
        </div>
      </form>

        <div className="right">
        <div className="self">
        <div onClick={toggleBell} className="bell">
        {bell ? <BiSolidBellRing className={`icon ${bell ? "blue": ""}`} /> : <BiSolidBellOff className="icon" />}
        <div className={`point ${bell ? "blue": ""}`}></div>
        </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
        <SheetTrigger><IoMenu className="menu" /></SheetTrigger>
          <SheetContent className="scroll-thin bg-[#050b1c]" side={side}>
            <SheetHeader>
              <SheetDescription>
                <ItemRight />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
      </Sheet>
      ))}
    </div>
        </div>
    </header>
  )
}

export default Header
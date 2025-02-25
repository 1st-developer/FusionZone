import { useState } from "react";
import ItemRight from "./ItemRight";
import "../Styles/Header.scss"
import { BiSolidBellRing } from "react-icons/bi";
import { BiSolidBellOff } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";


function Header() {

  const dispatch = useDispatch<AppDispatch>();

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
    <header>
        <div className="left">
        <h2>FusionZone</h2>
        </div>

        <div className="home-icon">
        <Link to="/"><FaHome className="icon" /></Link>
        </div>

        <div className="right">
        <div className="self">
        <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) {
            dispatch(searchFn(name));
            navigate(`/search/${name}`);
          }
        }}
      >
        <div className="input-box">
          <button type="submit"><IoMdSearch /></button>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="search"
            placeholder="Search..."
          />
        </div>
      </form>
        <div onClick={toggleBell} className="bell">
        {bell ? <BiSolidBellRing className={`icon ${bell ? "blue": ""}`} /> : <BiSolidBellOff className="icon" />}
        <div className={`point ${bell ? "blue": ""}`}></div>
        </div>
        </div>
        <Sheet>
          <SheetTrigger><IoMenu className="menu" /></SheetTrigger>
            <SheetContent className="scroll-thin bg-[#050b1c]">
              <SheetHeader>
                <SheetDescription>
                <ItemRight />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
    </header>
  )
}

export default Header
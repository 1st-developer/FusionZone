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
import { useNavigate } from "react-router-dom";


function Header() {

  const navigate = useNavigate();

  const [bell, setBell] = useState(false);
  const [show, setShow] = useState(false);

  const toggleBell = () => {
    setBell((prev) => !prev);
  }
  const toggleShow = () => {
    setShow((prev) => !prev);
  }

  return (
    <header>
        <div className="left">
        <IoMenu onClick={() => navigate("/menu")} className="menu" />
        <h2>Musalsal cartoon anime</h2>
        </div>

        <div className="right">
        <div className="input-box">
        <IoMdSearch onClick={toggleShow} className="search" />
        <input className={`input ${show ? "show": ""}`} type="search" />
        </div>
        <div onClick={toggleBell} className="bell">
        {bell ? <BiSolidBellRing className={`icon ${bell ? "blue": ""}`} /> : <BiSolidBellOff className="icon" />}
        <div className={`point ${bell ? "blue": ""}`}></div>
        </div>
        <Sheet>
          <SheetTrigger><IoMenu className="menu" /></SheetTrigger>
            <SheetContent className="scroll-thin bg-[#050b1c] text-white border-none">
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
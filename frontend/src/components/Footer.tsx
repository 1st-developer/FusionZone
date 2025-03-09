import { Link } from "react-router-dom";
import "../Styles/footer.scss"
import { IoPersonSharp } from "react-icons/io5";
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoAddCircle } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { BiSolidHome } from "react-icons/bi";

function Footer() {
  return (
    <div className="footer">
        <div className="footer-options">
            <Link className="icons" to="/"><BiSolidHome /></Link>
            <Link className="icons" to="/other"><FaUserFriends /></Link>
            <Link className="icons" to="/profile"><IoAddCircle /></Link>
            <Link className="icons" to="/other"><BiSolidMessageDetail /></Link>
            <Link className="icons" to="/profile"><IoPersonSharp /></Link>
        </div>
    </div>
  )
}

export default Footer
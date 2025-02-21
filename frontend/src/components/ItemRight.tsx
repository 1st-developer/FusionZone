import "../Styles/itemRight.scss"
import { Button } from "./ui/button"
import { IoLogOutOutline } from "react-icons/io5";
function ItemRight() {
  return (
    <div className="item-right">
      <div className="profile">
        <div className="image">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYOvDs-ry3nz6dC7R-Ut7z78f98QnTkD4bTsWCXman027r53vIrXhiMS7hJ6tUyMjb6mE&usqp=CAU" />
        </div>
        <div className="name">Mustafa Abdi</div>
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
        <Button>Setting</Button>
        <Button className="logout">Logout<IoLogOutOutline /></Button>
        </div>
      </div>
    </div>
  )
}

export default ItemRight
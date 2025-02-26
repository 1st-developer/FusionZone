import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import "../Styles/Home.scss"

function Home() {

  return (
    <div className="home">
        <Header />
        <Outlet />
    </div>
  )
}

export default Home
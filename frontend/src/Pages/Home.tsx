import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import "../Styles/Home.scss"
import Footer from "@/components/Footer"

function Home() {

  return (
    <div className="home">
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Home
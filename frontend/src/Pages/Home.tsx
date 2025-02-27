import { Outlet, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import "../Styles/Home.scss"
import Footer from "@/components/Footer"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useEffect } from "react"

function Home() {

  const loginState = useSelector((state: RootState) => state.loginSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if(loginState.data.isSuccess) {
      navigate("/");
    }else{
      navigate("/auth/sign-in");
    }
  }, [loginState])

  return (
    <div className="home">
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Home
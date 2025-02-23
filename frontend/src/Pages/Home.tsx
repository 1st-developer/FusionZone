import { Outlet, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import "../Styles/Home.scss"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

function Home() {

  const loginState = useSelector((state: RootState) => state.loginSlice);
  const navigate = useNavigate();

  useEffect(()=> {
    if(loginState.data.isSuccess) {
      navigate("/");
    }else {
      navigate("/auth/sign-in");
    }
  }, [])

  return (
    <div className="home">
        <Header />
        <Outlet />
    </div>
  )
}

export default Home
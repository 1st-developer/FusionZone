import {createBrowserRouter} from "react-router-dom"
import Home from "./Pages/Home"
import Body from "./Pages/Body"
import Login from "./Pages/Auth/Login"
import NotFound from "./Pages/notFound"
import Search from "./Pages/Search"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                index: true,
                element: <Body />
            },
            {
                path: "/search/:name",
                element: <Search />
            }
        ]
    },
    {
        path: "/auth",
        children: [
            {
                path: "sign-in",
                element: <Login />
            },
            {
                path: "sign-up",
                element: <h1>Register</h1>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router
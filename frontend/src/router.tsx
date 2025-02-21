import {createBrowserRouter} from "react-router-dom"
import Home from "./Pages/Home"
import ItemLeft from "./components/about"
import Body from "./Pages/Body"


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
                path: "/menu",
                element: <ItemLeft />
            }
        ]
    },
])

export default router
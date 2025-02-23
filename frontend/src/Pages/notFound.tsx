import { Button } from "@/components/ui/button"
import "../Styles/notFound.scss"
import { useNavigate } from "react-router-dom"
import Cloud from "@/Cloud";
function NotFound() {
    const navigate = useNavigate();
  return (
    <div className="not">
        <Cloud />
        <div className="span">
            <h2>404</h2>
            <p>Zite not found</p>
            <Button onClick={() => navigate("/")}>Back to the home</Button>
        </div>
    </div>
  )
}

export default NotFound
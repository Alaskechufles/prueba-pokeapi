import { Link } from "react-router-dom"


function NotFound() {
  return (
    <div>
        <p>NotFound</p>
        <Link to={"/"}>Regresar a Home</Link>
    </div>
  )
}

export default NotFound
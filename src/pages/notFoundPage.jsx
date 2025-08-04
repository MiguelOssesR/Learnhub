import { Link } from "react-router-dom"

function notFoundPage() {
    return (
        <div>
            <h1>Not Found Page ❌</h1>
            <Link to={"/"}>
                <button>Regresar al inicio</button>
            </Link>
        </div>
    )
}

export default notFoundPage
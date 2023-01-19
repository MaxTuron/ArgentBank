import { Link } from "react-router-dom";
import Header from "../components/header"
import "../styles/error.css"

export default function Error() {
    return (
        <div>
            <Header/>
            <main className="errorPage font-link">
                <div>
                    <p className="code404">401</p>
                    <p className="errorText">You are not authorized to access this page. Please login.</p>
                </div>
                <div>
                    <Link className="indexRedirect" to="/">Back to home page</Link>
                </div>
            </main>
        </div>
    )
}

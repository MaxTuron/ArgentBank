import { Link } from "react-router-dom";
import Header from "../components/header"
import "../styles/error.css"

export default function Error() {
    return (
        <div>
            <Header/>
            <main className="errorPage font-link">
                <div>
                    <p className="code404">404</p>
                    <p className="errorText">L'utilisateur recherché n'existe pas.</p>
                </div>
                <div>
                    <Link className="indexRedirect" to="/">Retourner sur la page d'accueil</Link>
                </div>
            </main>
        </div>
    )
}

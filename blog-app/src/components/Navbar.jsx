import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Navbar() {

  const { token, logout } = useContext(AuthContext)

  return (
    <nav>

      <Link to="/">Accueil</Link>

      {token ? (
        <>
          <Link to="/create">Créer un article</Link>
          <Link to="/my-articles">Mes articles</Link>

          <button onClick={logout}>
            Déconnexion
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Connexion</Link>
          <Link to="/register">Inscription</Link>
        </>
      )}

    </nav>
  )
}

export default Navbar
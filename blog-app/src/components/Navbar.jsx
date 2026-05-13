import { Link } from "react-router-dom"

function Navbar() {

  const token = localStorage.getItem("token")

  const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <nav>

      <Link to="/">Accueil</Link>

      {token ? (
        <>
          <Link to="/create">Créer</Link>

          <Link to="/my-articles">
            Mes articles
          </Link>

          <button onClick={logout}>
            Déconnexion
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            Connexion
          </Link>

          <Link to="/register">
            Inscription
          </Link>
        </>
      )}

    </nav>
  )
}

export default Navbar
import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Login() {

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await login(email, password)
      navigate("/")
    } catch (err) {
      alert("Erreur login")
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <h1>Connexion</h1>

      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        id="password"
        name="password"
        type="password"
        placeholder="Mot de passe"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">
        Se connecter
      </button>

    </form>
  )
}

export default Login
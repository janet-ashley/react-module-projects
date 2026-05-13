import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Register() {

  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await register(email, password)
      alert("Compte créé avec succès")
      navigate("/login")
    } catch (err) {
      alert("Erreur inscription")
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <h1>Inscription</h1>

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
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">
        S'inscrire
      </button>

    </form>
  )
}

export default Register
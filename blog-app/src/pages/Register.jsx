function Register() {
  return (
    <div>
      <h1>Inscription</h1>

      <form>

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Mot de passe"
        />

        <button type="submit">
          S'inscrire
        </button>

      </form>
    </div>
  )
}

export default Register
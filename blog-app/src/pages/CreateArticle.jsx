import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { createArticle } from "../lib/api"
import { useNavigate } from "react-router-dom"

function CreateArticle() {

  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createArticle(
        { title, content },
        token
      )

      navigate("/")
    } catch (err) {
      alert("Erreur création article")
    }
  }

  return (
    <div>
      <h1>Créer un article</h1>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Titre"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Contenu"
          onChange={(e) => setContent(e.target.value)}
        />

        <button>Publier</button>

      </form>
    </div>
  )
}

export default CreateArticle
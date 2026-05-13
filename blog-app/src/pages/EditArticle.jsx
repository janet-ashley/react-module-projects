import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getArticles, updateArticle } from "../lib/api"
import { AuthContext } from "../context/AuthContext"

function EditArticle() {

  const { id } = useParams()
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    loadArticle()
  }, [])

  const loadArticle = async () => {
    const res = await getArticles()
    const article = res.data.find(a => a.id == id)

    if (article) {
      setTitle(article.title)
      setContent(article.content)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      await updateArticle(
        id,
        { title, content },
        token
      )

      navigate("/")
    } catch (err) {
      alert("Erreur modification")
    }
  }

  return (
    <div>
      <h1>Modifier article</h1>

      <form onSubmit={handleUpdate}>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button>Modifier</button>

      </form>
    </div>
  )
}

export default EditArticle
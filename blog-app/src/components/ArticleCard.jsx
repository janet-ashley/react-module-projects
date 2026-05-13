import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { deleteArticle } from "../lib/api"

function ArticleCard({ article, refresh }) {

  const { token } = useContext(AuthContext)

  const handleDelete = async () => {
    try {
      await deleteArticle(article.id, token)
      refresh()
    } catch (err) {
      alert("Suppression refusée")
    }
  }

  return (
    <div style={{ border: "1px solid black", margin: 10, padding: 10 }}>

      <h3>{article.title}</h3>
      <p>{article.content}</p>
      <small>{article.authorEmail}</small>

      {token && (
        <button onClick={handleDelete}>
          Supprimer
        </button>
      )}
      <button
  onClick={() => window.location.href = `/edit/${article.id}`}
>
  Modifier
</button>

    </div>
  )
}

export default ArticleCard
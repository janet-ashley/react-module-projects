import { useEffect, useState, useContext } from "react"
import { getArticles } from "../lib/api"
import { AuthContext } from "../context/AuthContext"
import ArticleCard from "../components/ArticleCard"

function MyArticles() {

  const { token } = useContext(AuthContext)
  const [articles, setArticles] = useState([])

  const loadArticles = async () => {
    const res = await getArticles()
    setArticles(res.data)
  }

  useEffect(() => {
    loadArticles()
  }, [])

  // 🔐 récupérer email depuis token (simple hack frontend)
  const getUserEmailFromToken = () => {
    if (!token) return null
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.email
  }

  const userEmail = getUserEmailFromToken()

  const myArticles = articles.filter(
    a => a.authorEmail === userEmail
  )

  return (
    <div>

      <h1>Mes articles</h1>

      {myArticles.length === 0 ? (
        <p>Aucun article pour cet utilisateur</p>
      ) : (
        myArticles.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            refresh={loadArticles}
          />
        ))
      )}

    </div>
  )
}

export default MyArticles
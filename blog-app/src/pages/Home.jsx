import { useEffect, useState } from "react"
import { getArticles } from "../lib/api"
import ArticleCard from "../components/ArticleCard"

function Home() {

  const [articles, setArticles] = useState([])
  const [search, setSearch] = useState("")

  const loadArticles = async () => {
    const res = await getArticles()
    setArticles(res.data)
  }

  useEffect(() => {
    loadArticles()
  }, [])

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.content.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  return (
    <div>

      <h1>Accueil</h1>

      <input
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {sorted.length === 0 ? (
        <p>Aucun article</p>
      ) : (
        sorted.map(article => (
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

export default Home
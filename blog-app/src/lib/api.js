import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000"
})

// ARTICLES
export const getArticles = () => api.get("/articles")

export const createArticle = (data, token) =>
  api.post("/articles", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export default api
export const deleteArticle = (id, token) =>
  api.delete(`/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  export const updateArticle = (id, data, token) =>
  api.put(`/articles/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
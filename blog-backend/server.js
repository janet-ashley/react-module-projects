console.log("SERVER STARTING...")
const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const app = express()

app.use(cors())
app.use(express.json())

const SECRET_KEY = "mon_secret_jwt"

// Fake database
let users = []
let articles = []

// =========================
// Middleware auth
// =========================

function authMiddleware(req, res, next) {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: "Token manquant"
    })
  }

  const token = authHeader.split(" ")[1]

  try {

    const decoded = jwt.verify(token, SECRET_KEY)

    req.user = decoded

    next()

  } catch (error) {

    return res.status(401).json({
      message: "Token invalide"
    })
  }
}

// =========================
// REGISTER
// =========================

app.post("/register", async (req, res) => {

  const { email, password } = req.body

  const existingUser = users.find(
    user => user.email === email
  )

  if (existingUser) {
    return res.status(400).json({
      message: "Utilisateur existe déjà"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = {
    id: Date.now(),
    email,
    password: hashedPassword
  }

  users.push(newUser)

  res.json({
    message: "Utilisateur créé"
  })
})

// =========================
// LOGIN
// =========================

app.post("/login", async (req, res) => {

  const { email, password } = req.body

  const user = users.find(
    user => user.email === email
  )

  if (!user) {
    return res.status(400).json({
      message: "Utilisateur introuvable"
    })
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  )

  if (!isMatch) {
    return res.status(400).json({
      message: "Mot de passe incorrect"
    })
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    SECRET_KEY,
    {
      expiresIn: "1d"
    }
  )

  res.json({ token })
})

// =========================
// GET ALL ARTICLES
// =========================

app.get("/articles", (req, res) => {

  res.json(articles)
})

// =========================
// CREATE ARTICLE
// =========================

app.post("/articles", authMiddleware, (req, res) => {

  const { title, content } = req.body

  const newArticle = {
    id: Date.now(),
    title,
    content,
    authorId: req.user.id,
    authorEmail: req.user.email,
    createdAt: new Date()
  }

  articles.push(newArticle)

  res.json(newArticle)
})

// =========================
// DELETE ARTICLE
// =========================

app.delete("/articles/:id", authMiddleware, (req, res) => {

  const article = articles.find(
    article => article.id == req.params.id
  )

  if (!article) {
    return res.status(404).json({
      message: "Article introuvable"
    })
  }

  if (article.authorId !== req.user.id) {
    return res.status(403).json({
      message: "Accès refusé"
    })
  }

  articles = articles.filter(
    article => article.id != req.params.id
  )

  res.json({
    message: "Article supprimé"
  })
})

// =========================
// UPDATE ARTICLE
// =========================
app.get("/", (req, res) => {
  res.send("API OK")
})
app.put("/articles/:id", authMiddleware, (req, res) => {

  const article = articles.find(
    article => article.id == req.params.id
  )

  if (!article) {
    return res.status(404).json({
      message: "Article introuvable"
    })
  }

  if (article.authorId !== req.user.id) {
    return res.status(403).json({
      message: "Accès refusé"
    })
  }

  article.title = req.body.title
  article.content = req.body.content

  res.json(article)
})

// =========================
console.log("ABOUT TO LISTEN...")
const server = app.listen(3000, () => {
  console.log("Serveur lancé sur port 3000")
})

server.on("listening", () => {
  console.log("SERVER IS LISTENING OK")
})
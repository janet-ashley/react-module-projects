const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

let contacts = []

app.get("/contacts", (req, res) => {
  res.json(contacts)
})

app.post("/contacts", (req, res) => {
  contacts.push(req.body)
  res.json(req.body)
})

app.listen(3000, () => {
  console.log("Serveur lancé")
})
import { useState } from "react"

function ContactForm({ addContact }) {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: ""
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addContact(formData)

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: ""
    })
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="firstname"
        placeholder="Prénom"
        value={formData.firstname}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="lastname"
        placeholder="Nom"
        value={formData.lastname}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Téléphone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Ajouter
      </button>

    </form>
  )
}

export default ContactForm
import { useState } from "react"

function ContactItem({
  contact,
  deleteContact,
  updateContact
}) {

  const [isEditing, setIsEditing] = useState(false)

  const [editedContact, setEditedContact] = useState(contact)

  const handleChange = (e) => {

    setEditedContact({
      ...editedContact,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    updateContact(editedContact)
    setIsEditing(false)
  }

  return (
    <div className="contact-card">

      {isEditing ? (

        <div>

          <input
            type="text"
            name="firstname"
            value={editedContact.firstname}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastname"
            value={editedContact.lastname}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            value={editedContact.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            value={editedContact.phone}
            onChange={handleChange}
          />

          <button onClick={handleSave}>
            Sauvegarder
          </button>

        </div>

      ) : (

        <div>

          <h3>
            {contact.firstname} {contact.lastname}
          </h3>

          <p>Email : {contact.email}</p>

          <p>Téléphone : {contact.phone}</p>

          <button onClick={() => setIsEditing(true)}>
            Modifier
          </button>

          <button onClick={() => deleteContact(contact.id)}>
            Supprimer
          </button>

        </div>

      )}

    </div>
  )
}

export default ContactItem
import { useState } from "react"
import ContactForm from "./components/ContactForm"
import ContactList from "./components/ContactList"

function App() {

  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState("")

  // Ajouter un contact
  const addContact = (contact) => {

    // Validation email simple
    if (!contact.email.includes("@")) {
      alert("Email invalide")
      return
    }

    const newContact = {
      ...contact,
      id: Date.now()
    }

    setContacts([...contacts, newContact])
  }

  // Supprimer un contact
  const deleteContact = (id) => {
    setContacts(
      contacts.filter(contact => contact.id !== id)
    )
  }

  // Modifier un contact
  const updateContact = (updatedContact) => {

    setContacts(
      contacts.map(contact =>
        contact.id === updatedContact.id
          ? updatedContact
          : contact
      )
    )
  }

  // Recherche
  const filteredContacts = contacts
    .filter(contact =>
      `${contact.firstname} ${contact.lastname}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) =>
      a.lastname.localeCompare(b.lastname)
    )

  return (
    <div className="container">

      <h1>Gestion des contacts</h1>

      <input
        type="text"
        placeholder="Rechercher un contact..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ContactForm addContact={addContact} />

      <ContactList
        contacts={filteredContacts}
        deleteContact={deleteContact}
        updateContact={updateContact}
      />

    </div>
  )
}

export default App
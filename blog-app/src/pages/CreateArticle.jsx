function CreateArticle() {
  return (
    <div>
      <h1>Créer un article</h1>

      <form>

        <input
          type="text"
          placeholder="Titre"
        />

        <textarea
          placeholder="Contenu"
        />

        <button type="submit">
          Publier
        </button>

      </form>
    </div>
  )
}

export default CreateArticle
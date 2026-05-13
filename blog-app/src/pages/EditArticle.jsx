function EditArticle() {
  return (
    <div>
      <h1>Modifier un article</h1>

      <form>

        <input
          type="text"
          placeholder="Titre"
        />

        <textarea
          placeholder="Contenu"
        />

        <button type="submit">
          Modifier
        </button>

      </form>
    </div>
  )
}

export default EditArticle
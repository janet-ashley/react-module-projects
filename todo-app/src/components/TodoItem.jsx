function TodoItem({ todo, deleteTodo, toggleTodo }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        margin: "10px 0",
        textDecoration: todo.completed ? "line-through" : "none"
      }}
    >
      <span onClick={() => toggleTodo(todo.id)}>
        {todo.text}
      </span>

      <button onClick={() => deleteTodo(todo.id)}>
        Supprimer
      </button>
    </div>
  )
}

export default TodoItem
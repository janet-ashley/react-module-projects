import TodoItem from "./TodoItem"

function TodoList({ todos, deleteTodo, toggleTodo }) {
  return (
    <div>
      {todos.length === 0 ? (
        <p>Aucune tâche</p>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        ))
      )}
    </div>
  )
}

export default TodoList
import { useState } from "react"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"

function App() {

  const [todos, setTodos] = useState([])

  // Ajouter une tâche
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    }

    setTodos([...todos, newTodo])
  }

  // Supprimer
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Toggle (complété / non complété)
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

      <TodoForm addTodo={addTodo} />

      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  )
}

export default App
import TodoInput from "./components/TodoInput"
import { useState, useEffect, use } from "react"
import TodoList from "./components/TodoList"

function App() {
    const [todos, setTodos] = useState([])
    const [todoValue, setTodoValue] = useState("")

    function persistData (newList) {
      localStorage.setItem('todos', JSON.stringify(newList))
    }

    function handleAddTodos(newTodo) {
      const newTodoList = [...todos, newTodo]
      persistData(newTodoList)
      setTodos(newTodoList)

    }

    function handleDeleteTodo(Index) {
      const newTodoList = todos.filter((todo, todoIndex) => {
        return todoIndex !== Index
      })
      persistData(newTodoList)
      setTodos(newTodoList)
    }

    function handleEditTodo(Index) {
    const valueToBeEdited = todos[Index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(Index)
    }

    useEffect(() => {
      if(!localStorage) {
        return
      }
      let localTodos = localStorage.getItem("todos")
      if(!localTodos) {
        return
        localTodos = JSON.parse(localTodos).todos
        setTodos(localTodos)

      }
    }, [] )
  return (
    <>
     <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
     <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
    </>
  )
}

export default App

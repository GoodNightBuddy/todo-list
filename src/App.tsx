import React, { useState } from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import { Todo } from './todo.model';


function App() {

  const [todos, setTodos] = useState<Todo[]>([])

  const todoAddHandler = (text: string) => {
    setTodos(prevTodos => [...prevTodos, {id: Math.random(), text: text}]);
  };

const todoDeleteHandler = (todoId: number) => {
  setTodos(prevTodos => {
    return prevTodos.filter(todo => todo.id !== todoId)
  })


}

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler}/>
      <TodoList todos={todos} onDeleteTodo={todoDeleteHandler}/>
    </div>
  );
}

export default App;

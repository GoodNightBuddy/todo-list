import { useEffect, useState } from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import { Todo } from './todo.model';

// "proxy": "https://todo-list-back-end.herokuapp.com/"
function App() {

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('/todos', { method: 'GET' })
      .then(response => response.json())
      .then(data => setTodos(data.todos))
  }, [])

  const todoAddHandler = (text: string) => {
    fetch('/todos', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    })
      .then(response => response.json())
      .then(data => {
        if(!data.id || !data.text) {
          alert('Ooops, something went wrong');
        } else {
          setTodos(prevTodos => [...prevTodos, data]);
        }
      })
  };

  const todoDeleteHandler = (todoId: number) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId)
    })
    fetch(`/todos/${todoId}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      if(data.message === 'Todo deleted!') {
        setTodos(prevTodos => {
          return prevTodos.filter(todo => todo.id !== todoId)
        })
      } else {
        alert('Ooops, something went wrong');
      }
    });
  };

  const todoUpdateHandler = (id: number, text: string) => {
    fetch(`/todos/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    })
      .then(response => response.json())
      .then(data => {
        setTodos(prevTodos => [...prevTodos, data])
      })
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList todos={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
}

export default App;

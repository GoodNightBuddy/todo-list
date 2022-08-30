import { useEffect, useState } from 'react';
import { Loader } from './components/Loader/Loader';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import { Todo } from './todo.model';

function App() {

const url = 'https://todo-list-back-end.herokuapp.com';

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${url}/todos`, { method: 'GET',
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })
      .then(response => response.json())
      .then(data => setTodos(data.todos))
      .catch(error => console.log(error.message))
      .finally(() => setLoading(false))
  }, [])

  const todoAddHandler = (text: string) => {
    setLoading(true);
    fetch(`${url}/todos`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    })
      .then(response => response.json())
      .then(data => {
        if (!data.id || !data.text) {
          alert('Ooops, something went wrong');
        } else {
          setTodos(prevTodos => [...prevTodos, data]);
        }
      })
      .finally(() => setLoading(false))
  };

  const todoDeleteHandler = (todoId: number) => {
    setLoading(true);
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId)
    })
    fetch(`${url}/todos/${todoId}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Todo deleted!') {
          setTodos(prevTodos => {
            return prevTodos.filter(todo => todo.id !== todoId)
          })
        } else {
          alert('Ooops, something went wrong');
        }
      })
      .finally(() => setLoading(false))
  };

  const todoUpdateHandler = (todoId: number, text: string) => {
    fetch(`${url}/todos/${todoId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    })
      .then(response => response.json())
      .then(todo => {
        setTodos(prevTodos => {
          const index = prevTodos.findIndex(el => el.id === todo.id);
          prevTodos[index].text = todo.text;
          return prevTodos;
        })
      })
  };
  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} loading={loading} />
      {loading
        ? <Loader />
        : <TodoList todos={todos} onDeleteTodo={todoDeleteHandler} todoUpdateHandler={todoUpdateHandler} />}
    </div>
  );
}

export default App;

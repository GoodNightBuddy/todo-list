import Todo from './Todo';
import './TodoList.css';

interface TodoListProps {
  todos: { id: number, text: string }[];
  onDeleteTodo: (id: number) => void;
  todoUpdateHandler: (id: number, text: string) => void;
}


const TodoList: React.FC<TodoListProps> = props => {

  return (
    <ul >
      {props.todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          onDeleteTodo={props.onDeleteTodo}
          todoUpdateHandler={props.todoUpdateHandler}
        />
      ))}
    </ul>
  )
}

export default TodoList
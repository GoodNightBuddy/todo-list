import './NewTodo.css'
import React, { useEffect, useRef } from "react"

type NewTodoProps = {
  onAddTodo: (text: string) => void;
  loading: boolean;
}


const NewTodo: React.FC<NewTodoProps> = props => {

  let textInputRef = useRef<HTMLInputElement>(null);



  const toDoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if(!textInputRef.current!.value) return;
    const enteredText = textInputRef.current!.value;
    props.onAddTodo(enteredText);
    textInputRef.current!.value = '';
  };
  
  return (
    <form onSubmit={toDoSubmitHandler} className="form-control">
      <div>
        <label htmlFor="todo-text">Todo text</label>
        <input type="text" id="todo-text" ref={textInputRef}/>
      </div>
      <button type="submit" disabled={props.loading}>ADD TODO</button>
    </form>
  );
}

export default NewTodo
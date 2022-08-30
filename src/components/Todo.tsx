import { useRef, useState } from "react";

interface TodoProps {
  todo: { id: number, text: string };
  onDeleteTodo: (id: number) => void;
  todoUpdateHandler: (id: number, text: string) => void;
}


const Todo: React.FC<TodoProps> = props => {

  const textElement = useRef<HTMLSpanElement>(null);
  const [contentEditable, setContentEditable] = useState(false);

  function preventBlur(this: HTMLSpanElement, event: FocusEvent) {
    if (this.innerText === '') {
      this.focus();
    }
  }

  function submit(this: HTMLElement, event: KeyboardEvent) {
    if (event.code === 'Enter') {
      updateElement(this);
    }
  }


  function editElement(element: HTMLElement) {
    setContentEditable(prev => !prev);
    element.addEventListener('blur', preventBlur);
    element.addEventListener('keydown', submit);
    element.tabIndex = 0;
    setTimeout(() => element.focus(), 0)
  }

  function updateElement(element: HTMLElement) {
    if (element.innerText === '') return;
    element.tabIndex = -1;
    element.blur();
    element.removeEventListener('keydown', submit);
    element.removeEventListener('blur', preventBlur);
    setContentEditable(prev => !prev);
    props.todoUpdateHandler(props.todo.id, element.innerText);
  }

  const onEditHandler = () => {
    if (!textElement?.current) return;
    if (!contentEditable) {
      editElement(textElement.current);
    } else {
      updateElement(textElement.current);
    }
  }

  return (
    <li>
      <span ref={textElement} contentEditable={contentEditable}>{props.todo.text}</span>
      <div className="buttons">
        <button onClick={props.onDeleteTodo.bind(null, props.todo.id)}>DELETE</button>
        <button onClick={onEditHandler}>Edit</button>
      </div>

    </li>
  )
}

export default Todo
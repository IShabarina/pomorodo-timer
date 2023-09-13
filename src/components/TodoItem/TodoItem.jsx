import { Button } from '../Button/Button';
import styles from './TodoItem.module.css';


const TodoItem = ({ key, todo, onDelete }) => {

    return (
        <div key={key} className={todo.isStarted ? `${styles.todoItem} ${styles.active}` : styles.todoItem} >
            <span className={styles.title}>{todo.title}</span>
            <span>{todo.time}</span>
            <Button iconcomponent={'edit'} iconsize={30} onClick={() => {}} />
            <Button iconcomponent={'delete'} iconsize={30} onClick={() => onDelete(todo.id)} />
        </div>
    )
}

export default TodoItem;
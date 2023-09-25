import { useState } from 'react';
import { Button } from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import styles from './TodoItem.module.css';


const TodoItem = ({ todo, onEdit, onFinish, onDelete }) => {
    const [editMode, setEditMode] = useState(false);

    const onChangeTask = (e) => {
        const reTask = {
            [e.target.name]: e.target.value,
            id: todo.id
        }
        onEdit(reTask);
    }

    const onSubmitEditForm = (e) => {
        e.preventDefault();
        setEditMode(false);
    }

    return (
        <div
            // key={todo.id}
            className={todo.isStarted ?
                `${styles.todoItem} ${styles.active}`
                : todo.isCompleted ?
                    `${styles.todoItem} ${styles.completed}`
                    : styles.todoItem} >
            <Checkbox checked={todo.isCompleted} onClick={() => onFinish(todo.id)} />
            {!editMode && (
                <>
                    <span className={styles.todoTitle}>{todo.title}</span>
                    <span>{todo.time}</span>
                </>
            )}
            {editMode && (
                <form onSubmit={onSubmitEditForm}>
                    <input type='text' name='text' value={todo.title} onChange={onChangeTask} required />
                    <input type='number' name='time' value={todo.time} onChange={onChangeTask} min={1} max={4} />
                    <button type='submit' style={{ display: 'none' }}></button>
                </form>
            )}
            <Button iconcomponent={'edit'} iconsize={30} onClick={() => setEditMode(true)} />
            <Button iconcomponent={'delete'} iconsize={30} onClick={() => onDelete(todo.id)} />
        </div>
    )
}

export default TodoItem;
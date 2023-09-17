import styles from './NewTaskForm.module.css';
import { Button } from '../Button/Button';
import { useState } from 'react';

const NewTaskForm = ({ onAdd }) => {
    const initialTask = {
        text: '',
        time: 1
    }
    const [task, setTask] = useState(initialTask);
    const updateTask = e => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('task:', task);
        onAdd(task);
        setTask(initialTask)
    }

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>ADD NEW TASK</h2>
            <form
                className={styles.addTodoForm}
                onSubmit={onSubmit}
            >
                <input className={styles.input}
                    type="text"
                    name="text"
                    onChange={updateTask}
                    value={task.text}
                    placeholder='Add new task..'
                    required
                    autoComplete='off' />
                <div className={styles.selectConteiner}>
                    <select className={styles.select}
                        name="time"
                        onChange={updateTask}
                        value={task.time}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <Button iconcomponent={'add'} iconsize={35} onClick={() => { }} />
            </form>
            {/* <div className={styles.error}>{error}</div> */}
        </div>
    )
}

export default NewTaskForm;
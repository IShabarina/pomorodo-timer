import { useStore } from 'effector-react';
import { $task } from '../../store';
import { changeTaskText, changeTaskTime } from '../../event';

import styles from './NewTaskForm.module.css';
import { Button } from '../Button/Button';

$task
    .on(changeTaskText, (state, newText) => ({
        ...state,
        text: newText
    }))
    .on(changeTaskTime, (state, newTime) => ({
        ...state,
        time: newTime
    }));

const NewTaskForm = ({ onSubmit }) => {
    const task = useStore($task);

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Add new task</h2>
            <form
                className={styles.addTodoForm}
                onSubmit={e => onSubmit(e)}
            >
                <input className={styles.input}
                    type="text"
                    name="task"
                    onChange={e => changeTaskText(e.currentTarget.value)}
                    value={task.text}
                    placeholder='new task..'
                    required />
                <div className={styles.selectConteiner}>
                    <select className={styles.select}
                        name="count"
                        onChange={e => changeTaskTime(e.currentTarget.value)}
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
        </div>
    )
}

export default NewTaskForm;
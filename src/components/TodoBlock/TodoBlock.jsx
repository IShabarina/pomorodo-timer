import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoBlock.module.css';

import { $todoList, $timer } from '../../store';
import { addTodo, startFirstTodo, toggleFinishTodo, deleteTodo, finishTodo, editTodo } from '../../store';
import { useStore, useStoreMap } from 'effector-react';
import { useEffect } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';


const TodoBlock = () => {
    
    const todoList = useStore($todoList);
    const timerIsStartedStatus = useStoreMap({
        store: $timer,
        keys: ['isStarted'],
        fn: (state) => state.isStarted,
    })
    const timerWorkSessionsCount = useStoreMap({
        store: $timer,
        keys: ['workSessionsCount'],
        fn: (state) => state.workSessionsCount,
    })

    const totalTasks = todoList.length;

    useEffect(() => {
        if (timerIsStartedStatus) {
            startFirstTodo();
        }
    }, [timerIsStartedStatus]);

    useEffect(() => {
        finishTodo();
        startFirstTodo();
    }, [timerWorkSessionsCount]);


    const onAdd = (task) => {
        addTodo(task);
    }

    const onDelete = (id) => {
        deleteTodo(id);
    }

    const onFinish = (id) => {
        toggleFinishTodo(id);
    }

    const onEdit = (reTask) => {
        editTodo(reTask);
    }

    return (
        <div className={styles.todoSection}>
            <NewTaskForm onAdd={onAdd} />
            <div className={styles.todoListContainer}>
                <h4 className={styles.title}>YOUR TASKS ({totalTasks})</h4>
                <div className={styles.todoList}>
                    {todoList.map(todoItem => (
                        <TodoItem
                            key={todoItem.id}
                            todo={todoItem}
                            onDelete={onDelete}
                            onFinish={onFinish}
                            onEdit={onEdit} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TodoBlock;
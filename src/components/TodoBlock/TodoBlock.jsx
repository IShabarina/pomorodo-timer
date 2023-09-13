import { generateRandomString } from '../../utils/generateRandomIndex';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoBlock.module.css';

import { $todoList, $doneList, $task, $timerActivity } from '../../store';
import { addTodo, startFirstTodo, deleteTodo, finishTodo, addDoneTask } from '../../event';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

addTodo.watch((e) => {
    e.preventDefault()
})

$todoList
    .on(addTodo, (todoList, task) => [
        ...todoList,
        {
            title: task.text,
            isStarted: false,
            isCompleted: false,
            time: task.time,
            timeLeft: task.time,
            id: generateRandomString(),
        },
    ])
    .on(startFirstTodo, (todoList, status) =>
        todoList.map((todo, i) => {
            if (i === 0) {
                return {
                    ...todo,
                    isStarted: status,
                };
            }
            return todo;
        }))
    .on(deleteTodo, (todoList, id) =>
        todoList.filter(todo => todo.id !== id)
    )
    .on(finishTodo, (todoList) =>
        todoList.map((todo) => {
            let newTimeLeft = todo.timeLeft;
            if (todo.isStarted === true) {
                newTimeLeft = Math.max(0, todo.timeLeft - 1);
                if (newTimeLeft === 0) {
                    addDoneTask(todo);
                    // return {
                    //     ...todo,
                    //     isStarted: false,
                    //     isCompleted: true,
                    //     timeLeft: newTimeLeft,
                    // };
                    return null;
                }
            }
            return {
                ...todo,
                timeLeft: newTimeLeft,
            };
        }).filter((todo) => todo !== null))

$doneList
    .on(addDoneTask, (doneList, doneTask) => [
        ...doneList,
        doneTask
    ])

export const TodoBlock = () => {
    const task = useStore($task);
    const todoList = useStore($todoList);
    const timerActivity = useStore($timerActivity);


    const qtyOfTask = todoList.length;

    useEffect(() => {
        if (timerActivity.isStarted) {
            startFirstTodo(true);
        }
    }, [timerActivity.isStarted]);

    useEffect(() => {
        finishTodo();
        startFirstTodo(true);
    }, [timerActivity.workSessionsCount]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (task.text.length > 0) {
            addTodo(task);
            startFirstTodo(false);
        }
    }

    const onDelete = (id) => {
        console.log('Delete item', id)
        deleteTodo(id);
    }

    return (
        <div className={styles.todoSection}>
            <NewTaskForm onSubmit={onSubmit} />

            <div className={styles.todoListContainer}>
                <h4 className={styles.title}>Your tasks ({qtyOfTask})</h4>
                <div className={styles.todoList}>
                    {todoList.map(todoItem => (
                        <TodoItem key={todoItem.id} todo={todoItem} onDelete={onDelete}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
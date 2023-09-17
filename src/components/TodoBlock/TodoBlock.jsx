import { generateRandomString } from '../../utils/generateRandomIndex';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoBlock.module.css';

import { $todoList, $doneList, $timerActivity } from '../../store';
import { addTodo, startFirstTodo, toggleFinishTodo, deleteTodo, finishTodo, addDoneTask, editTodo } from '../../event';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

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
    .on(startFirstTodo, (todoList) => {
        let firstNotStartedTodoIndex = -1;
        const updatedTodos = todoList.map((todo, index) => {
            if (!todo.isCompleted && firstNotStartedTodoIndex === -1) {
                firstNotStartedTodoIndex = index;
                return {
                    ...todo,
                    isStarted: true,
                };
            } else {
                return {
                    ...todo,
                    isStarted: false,
                };
            }
        });
        return updatedTodos;
    })
    .on(deleteTodo, (todoList, id) =>
        todoList.filter(todo => todo.id !== id)
    )
    .on(toggleFinishTodo, (todoList, id) =>
        todoList.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isStarted: false,
                    isCompleted: !todo.isCompleted,
                };
            }
            return todo;
        }))
    .on(editTodo, (todoList, editedTask) =>
        todoList.map((todo) => {
            console.log('editedTask passed', editedTask);
            if (todo.id === editedTask.id) {
                console.log('edit todo:', todo);
                return {
                    ...todo,
                    title: editedTask['text'] !== undefined ? editedTask.text : todo.title,
                    time: editedTask['time'] !== undefined ? editedTask.time : todo.time,
                };
            }
            return todo;
        })
    )
    .on(finishTodo, (todoList) =>
        todoList.map((todo) => {
            let newTimeLeft = todo.timeLeft;
            if (todo.isStarted === true) {
                newTimeLeft = Math.max(0, todo.timeLeft - 1);
                if (newTimeLeft === 0) {
                    addDoneTask(todo);
                    return {
                        ...todo,
                        isStarted: false,
                        isCompleted: true,
                        timeLeft: newTimeLeft,
                    };
                }
            }
            return {
                ...todo,
                timeLeft: newTimeLeft,
            };
            // }).filter((todo) => todo !== null))
        }))

$doneList
    .on(addDoneTask, (doneList, doneTask) => [
        ...doneList,
        doneTask
    ])


const TodoBlock = () => {
    const todoList = useStore($todoList);
    const timerActivity = useStore($timerActivity);

    const totalTasks = todoList.length;

    useEffect(() => {
        if (timerActivity.isStarted) {
            startFirstTodo();
        }
    }, [timerActivity.isStarted]);

    useEffect(() => {
        finishTodo();
        startFirstTodo();
    }, [timerActivity.workSessionsCount]);


    const onAdd = (task) => {
        addTodo(task);
        // startFirstTodo(false);
    }

    const onDelete = (id) => {
        console.log('Delete item', id)
        deleteTodo(id);
    }

    const onFinish = (id) => {
        console.log('Finish item', id);
        toggleFinishTodo(id);
    }

    const onEdit = (reTask) => {
        console.log('reTask in TodoBlock', reTask)
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
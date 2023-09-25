import { createStore, createEvent } from 'effector';
import { generateRandomString } from './utils/generateRandomIndex';

// for timer's settings:
export const updateSettings = createEvent();
export const $settings = createStore({
    workMin: 15,
    breakMin: 5,
    longBreakMin: 15
})
    .on(updateSettings, (_, newSettings) => newSettings);

// for current timer's activity:
export const changeTimerVisibility = createEvent();
export const startTimer = createEvent();
export const increaseTimerWorkSessionCount = createEvent();
export const increaseTimerWorkTime = createEvent();
export const increaseTimerPauseTime = createEvent();
export const $timer = createStore({
    isVisible: true,
    isStarted: false,
    workSessionsCount: 0,
})
    .on(changeTimerVisibility, (state, status) => ({
        ...state,
        isVisible: status
    }))
    .on(startTimer, (state, status) => ({
        ...state,
        isStarted: status
    }))
    .on(increaseTimerWorkSessionCount, (state) => ({
        ...state,
        workSessionsCount: state.workSessionsCount + 1
    }))

// for list of tasks:
export const addTodo = createEvent();
export const startFirstTodo = createEvent();
export const toggleFinishTodo = createEvent();
export const editTodo = createEvent();
export const deleteTodo = createEvent();
export const finishTodo = createEvent();

export const $todoList = createStore([])
    .on(addTodo, (todoList, task) => [
        ...todoList,
        {
            id: generateRandomString(),
            title: task.text,
            isStarted: false,
            isCompleted: false,
            time: task.time,
            timeLeft: task.time,
            // startedAt: new Date(),
            // workTime: 
            // pauseTime:
            // stopped:
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
            if (todo.id === editedTask.id) {
                return {
                    ...todo,
                    title: editedTask['text'] !== undefined ? editedTask.text : todo.title,
                    time: editedTask['time'] !== undefined ? editedTask.time : todo.time,
                    timeLeft: editedTask['time'] !== undefined ? editedTask.time : todo.time,
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
        }));


// for completed tasks:
export const addDoneTask = createEvent();
export const $doneList = createStore([])
    .on(addDoneTask, (doneList, doneTask) => [
        ...doneList,
        doneTask
    ]);

// for timer statistic:
export const $statistic = createStore({
    date: new Date(),
    workSec: 0,
    pauseSec: 0,
})
    .on(increaseTimerWorkTime, (state) => ({
        ...state,
        workSec: state.workSec + 1
    }))
    .on(increaseTimerPauseTime, (state) => ({
        ...state,
        pauseSec: state.pauseSec + 1
    }));;


//watchers:
$settings.watch((state) => {
    console.log('$settings:', state);
});
$timer.watch((state) => {
    console.log('$timer:', state);
});
$todoList.watch((state) => {
    console.log('$todoList', state);
});
$doneList.watch((state) => {
    console.log('$doneList', state);
});
// $statistic.watch((state) => {
//     console.log('$statistic', state);
// })

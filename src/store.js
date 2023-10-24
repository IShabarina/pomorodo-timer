import { createStore, createEvent } from 'effector';
import { generateRandomString } from './utils/generateRandomIndex';
import { getCurrentDateWithoutTime } from './utils/getDateWithoutTime';

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
export const updateTimerWorkSec = createEvent();
export const updateTimerPauseSec = createEvent();
export const updateTimerStopsCount = createEvent();
export const $timer = createStore({
    isVisible: true,
    isStarted: false,
    workSessionsCount: 0,
    activity: [],
})
    .on(changeTimerVisibility, (state, status) => ({
        ...state,
        isVisible: status
    }))
    .on(startTimer, (state, status) => {
        let newDate = getCurrentDateWithoutTime();
        console.log('startTimer - state.activity.length:', state.activity.length);
        console.log('startTimer - index', state.activity.findIndex((item) => item.date === newDate));
        if (state.activity.length === 0 || state.activity.findIndex((item) => item.date === newDate) === -1) {
            console.log('startTimer - создаем объект в activity')
            return {
                ...state,
                isStarted: status,
                activity: [
                    ...state.activity,
                    { date: newDate, workSec: 0, pauseSec: 0, stopCount: 0, },
                ],
            };
        }
        return {
            ...state,
            isStarted: status
        };
    })
    .on(increaseTimerWorkSessionCount, (state) => ({
        ...state,
        workSessionsCount: state.workSessionsCount + 1
    }))
    .on(updateTimerWorkSec, (state, sec) => {
        let newDate = getCurrentDateWithoutTime();
        const existSessionIndex = state.activity.findIndex((item) => item.date === newDate);
        const updatedActivity = [...state.activity];
        console.log('updateTimerWorkSec - updatedActivity:', updatedActivity);
        updatedActivity[existSessionIndex] = {
            ...updatedActivity[existSessionIndex],
            workSec: updatedActivity[existSessionIndex].workSec + sec,
        };
        return {
            ...state,
            activity: updatedActivity,
        }
    })
    .on(updateTimerPauseSec, (state, sec) => {
        let newDate = getCurrentDateWithoutTime();
        const existSessionIndex = state.activity.findIndex((item) => item.date === newDate);
        const updatedActivity = [...state.activity];
        updatedActivity[existSessionIndex] = {
            ...updatedActivity[existSessionIndex],
            pauseSec: updatedActivity[existSessionIndex].pauseSec + sec,
        };
        return {
            ...state,
            activity: updatedActivity,
        }
    })
    .on(updateTimerStopsCount, (state) => {
        let newDate = getCurrentDateWithoutTime();
        const existSessionIndex = state.activity.findIndex((item) => item.date === newDate);
        const updatedActivity = [...state.activity];
        updatedActivity[existSessionIndex] = {
            ...updatedActivity[existSessionIndex],
            stopCount: updatedActivity[existSessionIndex].stopCount + 1,
        };
        return {
            ...state,
            activity: updatedActivity,
        }
    })

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
            startedAt: 0,
            duration: 0,
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
                    startedAt: getCurrentDateWithoutTime(),
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

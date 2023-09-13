import { createStore } from 'effector';
// import { updateSettings } from './event';

// Effector's stores:

export const $settings = createStore({
    workMin: 15,
    breakMin: 5,
    longBreakMin: 15
});
export const $settingsVisible = createStore(false);
export const $timerActivity = createStore({
    isStarted: false,
    workSessionsCount: 1,
});
// export const $taskSessionCount = createStore(0);
export const $task = createStore({
    text: '',
    time: 1
});
export const $todoList = createStore([]);
export const $doneList = createStore([]);


//watchers:
$settings.watch((state) => {
    console.log('$settings:', state);
})

$settingsVisible.watch((state) => {
    console.log('$settingsVisible:', state);
})
$timerActivity.watch((state) => {
    console.log('$timerActivity:', state);
})
$task.watch((state) => {
    console.log('$task:', state);
})

$todoList.watch((state) => {
    console.log('$todoList', state);
})

$doneList.watch((state) => {
    console.log('$doneList', state);
})
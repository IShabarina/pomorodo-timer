import { createStore } from 'effector';

// Effector's stores:
// for timer's settings:
export const $settings = createStore({
    workMin: 15,
    breakMin: 5,
    longBreakMin: 15
});

// for initial mode of Timer:
export const $settingsVisible = createStore(false);

// for current timer's activity:
export const $timerActivity = createStore({
    isStarted: false,
    workSessionsCount: 1,
});

// for list of tasks:
export const $todoList = createStore([]);

// for completed tasks:
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
$todoList.watch((state) => {
    console.log('$todoList', state);
})
$doneList.watch((state) => {
    console.log('$doneList', state);
})
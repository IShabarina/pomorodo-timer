import { createEvent } from 'effector';

export const updateSettings = createEvent();
export const updateSettingsVisible = createEvent();

export const addTodo = createEvent();
export const startFirstTodo = createEvent();
export const deleteTodo = createEvent();
export const finishTodo = createEvent();

export const addDoneTask = createEvent();

export const changeTaskText = createEvent();
export const changeTaskTime = createEvent();

export const changeWorkSessionsCount = createEvent();
export const increaseTimerWorkSessionCount = createEvent();
export const startTimer = createEvent();
export const updateTaskSessionCount = createEvent();
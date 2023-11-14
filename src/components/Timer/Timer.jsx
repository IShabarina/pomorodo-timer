import React, { useEffect, useState, useRef } from 'react';
import styles from './Timer.module.css';
import { useStore, useStoreMap } from 'effector-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Button } from '../Button/Button';
import { $settings, $todoList, $timer, changeTimerVisibility, startTimer, increaseTimerWorkSessionCount, updateWorkSessionCount, updateTimerWorkSec, updateTimerPauseSec, updateTimerStopsCount } from '../../store';

const tomatoColor = '#f54e54';
const greenColor = '#318954';


const Timer = () => {

    const settings = useStore($settings);
    const countNotCompletedTasks = useStoreMap({
        store: $todoList,
        keys: [],
        fn: (state) => (state.length === 0) ? 0 : state.filter((todo) => todo.isCompleted === false).length,
    })

    const [timerInfo, setTimerInfo] = useState({
        isStarted: false,
        isPaused: true,
        timerMode: 'work',
        secondsLeft: settings.workMin * 60,
        workSessionsCount: $timer.getState().workSessionsCount,
        workSecCount: 0,
        pauseSecCount: 0,
        hasTasks: countNotCompletedTasks,
    });
    const timerInfoRef = useRef(timerInfo);
    const setTimerInfoState = (newState) => {
        setTimerInfo((prevTimerInfo) => {
            return {
                ...prevTimerInfo,
                ...newState,
            };
        });
    }
    const setTimerInfoRef = (newState) => {
        timerInfoRef.current = { ...timerInfoRef.current, ...newState };
    }

    const setTimerIsVisible = () => {
        changeTimerVisibility(false);
    };

    const setWorkSessions = () => {
        if (timerInfoRef.current.timerMode === 'work') {
            increaseTimerWorkSessionCount();
            updateWorkSessionCount();
            setTimerInfoState({ workSessionsCount: timerInfo.workSessionsCount + 1 });
            setTimerInfoRef({ workSessionsCount: timerInfoRef.current.workSessionsCount + 1 });
        }
    }

    function switchMode() {
        const nextMode = timerInfoRef.current.timerMode === 'work'
            ? (timerInfoRef.current.workSessionsCount !== 0 && timerInfoRef.current.workSessionsCount % 4 === 0) ? 'longBreak' : 'break'
            : 'work';
        const nextSeconds = {
            work: settings.workMin * 60,
            break: settings.breakMin * 60,
            longBreak: settings.longBreakMin * 60,
        }[nextMode];
        setTimerInfoState({ timerMode: nextMode, secondsLeft: nextSeconds });
        setTimerInfoRef({ timerMode: nextMode, secondsLeft: nextSeconds });
    };

    function onPlayButtonClick() {
        if (!timerInfo.hasTasks) return;
        setTimerInfoState({ isPaused: false, isStarted: true });
        setTimerInfoRef({ isPaused: false, isStarted: true });
        startTimer(true);
    }

    function onPauseButtonClick() {
        setTimerInfoState({ isPaused: true });
        setTimerInfoRef({ isPaused: true });
    }

    function onNextBtnClick() {
        setTimerInfoState({ isPaused: false, isStarted: true, secondsLeft: 0 });
        setTimerInfoRef({ isPaused: false, isStarted: true, secondsLeft: 0 });
    }

    function onStopBtnClick() {
        if (timerInfoRef.current.isStarted) {
            setTimerInfoState({ isStarted: false, isPaused: true });
            setTimerInfoRef({ isStarted: false, isPaused: true });
            updateTimerStopsCount();
            initTimer();
        }
    }

    function tick() {
        const newSecondsLeft = timerInfoRef.current.secondsLeft - 1;
        setTimerInfoState({ secondsLeft: newSecondsLeft });
        setTimerInfoRef({ secondsLeft: newSecondsLeft });
    }

    function initTimer() {
        const mode = timerInfoRef.current.timerMode;
        const modeToMin = {
            work: settings.workMin,
            break: settings.breakMin,
            longBreak: settings.longBreakMin,
        };
        const totalSecondsLeft = modeToMin[mode] * 60;
        setTimerInfoState({ secondsLeft: totalSecondsLeft });
        setTimerInfoRef({ secondsLeft: totalSecondsLeft });
    }

    useEffect(() => {
        initTimer();
    }, [settings]);

    //update 'hasTasks':
    useEffect(() => {
        setTimerInfoState({ hasTasks: countNotCompletedTasks });
        setTimerInfoRef({ hasTasks: countNotCompletedTasks });
    }, [countNotCompletedTasks]);

    useEffect(() => {
        let interval;

        if (timerInfoRef.current.isStarted) {
            if (!timerInfoRef.current.hasTasks) {
                clearInterval(interval);
                setTimerInfoState({ isPaused: true, isStarted: false });
                setTimerInfoRef({ isPaused: true, isStarted: false });
                startTimer(false);
                initTimer();
                return
            } else {
                interval = setInterval(() => {
                    if (timerInfoRef.current.isPaused) {
                        // timerPauseSecCount();
                        updateTimerPauseSec(1);
                        return;
                    }
                    if (timerInfoRef.current.secondsLeft === 0) {
                        setWorkSessions();
                        return switchMode();
                    }
                    tick();
                    if (timerInfoRef.current.timerMode === 'work') {
                        // timerWorkSecCount(); // for this task count sec
                        updateTimerWorkSec(1);
                    }
                }, 10);
                return () => clearInterval(interval);
            }
        }
    }, [timerInfoRef.current.hasTasks, timerInfoRef.current.isStarted]);

    // time data for Timer visual:
    const timeRemaining = {
        percentage: Math.round(
            (timerInfo.secondsLeft /
                ((timerInfo.timerMode === 'work'
                    ? settings.workMin
                    : timerInfo.timerMode === 'break'
                        ? settings.breakMin
                        : settings.longBreakMin) *
                    60) *
                100)
        ),
        minutes: Math.floor(timerInfo.secondsLeft / 60),
        seconds: (timerInfo.secondsLeft % 60 < 10 ? '0' : '') + (timerInfo.secondsLeft % 60),
    };

    return (
        <>
            <p className={styles.notice}> {!timerInfo.hasTasks ? `ADD TASK TO START!` : ``}</p>
            <div className={styles.timerSection}>
                <div className={styles.timerBar}>
                    <CircularProgressbar
                        value={timeRemaining.percentage}
                        text={timeRemaining.minutes + ':' + timeRemaining.seconds}
                        styles={buildStyles({
                            pathColor: timerInfo.timerMode === 'work' ? tomatoColor : greenColor,
                            textColor: '#fff',
                            trailColor: 'rgba(255, 255,255, .2)',
                        })} />
                </div>
                <div className={styles.buttonsBar}>
                    <Button iconcomponent={'settings'} onClick={setTimerIsVisible} text={''} iconsize={50} />
                    <Button iconcomponent={'next'} onClick={onNextBtnClick} text={''} iconsize={50} />
                    {timerInfo.isPaused
                        ? <Button iconcomponent={'play'} onClick={onPlayButtonClick} text={''} iconsize={50} />
                        : <Button iconcomponent={'pause'} onClick={onPauseButtonClick} text={''} iconsize={50} />
                    }
                    <Button iconcomponent={'stop'} onClick={onStopBtnClick} text={''} iconsize={50} />
                </div>
            </div>

        </>
    )
}

export default Timer;
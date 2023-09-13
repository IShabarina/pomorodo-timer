import React, { useEffect, useState, useRef } from 'react';
import styles from './Timer.module.css';
import { useStore } from 'effector-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import { Button } from '../Button/Button';

import { $settingsVisible, $settings, $timerActivity } from '../../store';
import { updateSettingsVisible, increaseTimerWorkSessionCount, startTimer } from '../../event';

$settingsVisible
    .on(updateSettingsVisible, (_, newSettingsMode) => newSettingsMode); //action & reducer

$timerActivity
    .on(increaseTimerWorkSessionCount, (state) => ({
        ...state,
        workSessionsCount: state.workSessionsCount + 1
    }))
    .on(startTimer, (state, status) => ({
        ...state,
        isStarted: status
    }));

const tomatoColor = '#f54e54';
const greenColor = '#318954';

const Timer = () => {
    const settingsModeOn = useStore($settingsVisible);
    const settings = useStore($settings);
    const timerActivityData = useStore($timerActivity);

    const [isPaused, setIsPaused] = useState(true); // to show play btn initially
    const [timerMode, setTimerMode] = useState('work'); //work/break/longBreak
    const [secondsLeft, setsecondsLeft] = useState(0); // 0 sec till end

    const isPausedRef = useRef(isPaused);
    const timerModeRef = useRef(timerMode);
    const secondsLeftRef = useRef(secondsLeft);

    const setSettingsMode = (mode) => {
        updateSettingsVisible(mode);
    };

    function switchMode() {
        let workSessionsCount = timerActivityData.workSessionsCount;
        console.log('workSessionsCount', workSessionsCount);
        const nextMode = timerModeRef.current === 'work'
            // ? (timerActivityData.workSessionsCount + 1) % 4 === 0 ? 'longBreak' : 'break'
            ? workSessionsCount % 4 === 0 ? 'longBreak' : 'break'
            : 'work';
        let nextSeconds;
        console.log('nextMode:', nextMode);
        switch (nextMode) {
            case 'work':
                increaseTimerWorkSessionCount();
                nextSeconds = settings.workMin * 60;
                break;
            case 'break':
                // increaseTimerWorkSessionCount();
                nextSeconds = settings.breakMin * 60;
                break;
            case 'longBreak':
                // increaseTimerWorkSessionCount();
                nextSeconds = settings.longBreakMin * 60;
                break;
            default:
                nextSeconds = 0;
        }
        setTimerMode(nextMode);
        timerModeRef.current = nextMode;
        setsecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    }

    function onPlayButtonClick() {
        setIsPaused(false);
        isPausedRef.current = false;
        startTimer(true);
    }

    function onPauseButtonClick() {
        setIsPaused(true);
        isPausedRef.current = true;
        startTimer(false);
    }

    function tick() {
        secondsLeftRef.current = secondsLeftRef.current - 1;
        setsecondsLeft(secondsLeftRef.current);
    }

    function initTimer() {
        setsecondsLeft(settings.workMin * 60);
        secondsLeftRef.current = settings.workMin * 60;
        console.log('initTimer - secondsLeftRef', secondsLeftRef.current);
        console.log('initTimer - secondsLeft', secondsLeft);
    }

    useEffect(() => {
        initTimer();
        const interval = setInterval(() => {
            if (isPausedRef.current) {
                console.log('isPausedRef.current:', isPausedRef.current);
                return;
            }
            if (secondsLeftRef.current === 0) {
                console.log('secondsLeftRef.current:', secondsLeftRef.current);
                return switchMode();
            }
            tick();
        }, 10);
        return () => clearInterval(interval);
    }, [settings]);

    // time data for Timer visual:
    const timeRemaining = {
        percentage: Math.round(
            (secondsLeft /
                ((timerMode === 'work'
                    ? settings.workMin
                    : timerMode === 'break'
                        ? settings.breakMin
                        : settings.longBreakMin) *
                    60) *
                100)
        ),
        minutes: Math.floor(secondsLeft / 60),
        seconds: (secondsLeft % 60 < 10 ? '0' : '') + (secondsLeft % 60),
    };

    return (
        <>
            {!settingsModeOn &&
                <div className={styles.timerSection}>
                    <div className={styles.timerBar}>
                        <CircularProgressbar
                            value={timeRemaining.percentage}
                            text={timeRemaining.minutes + ':' + timeRemaining.seconds}
                            styles={buildStyles({
                                pathColor: timerMode === 'work' ? tomatoColor : greenColor,
                                textColor: '#fff',
                                trailColor: 'rgba(255, 255,255, .2)',
                            })} />
                    </div>
                    <div className={styles.buttonsBar}>
                        <Button iconcomponent={'settings'} onClick={() => { setSettingsMode(true) }} text={''} iconsize={50} />
                        <Button iconcomponent={'next'} onClick={() => { }} text={''} iconsize={50} />
                        {isPaused
                            ? <Button iconcomponent={'play'} onClick={onPlayButtonClick} text={''} iconsize={50} />
                            : <Button iconcomponent={'pause'} onClick={onPauseButtonClick} text={''} iconsize={50} />
                        }
                        <Button iconcomponent={'stop'} onClick={() => { }} text={''} iconsize={50} />
                    </div>
                </div>
            }
        </>
    )
}

export default Timer;
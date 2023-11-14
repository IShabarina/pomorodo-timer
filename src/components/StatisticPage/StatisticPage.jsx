// import DoneBlock from '../DoneBlock/DoneBlock';
import { useStore } from 'effector-react';
import TimerChart from '../TimerChart/TimerChart';
import styles from './StatisticPage.module.css';
import { getDayOfWeek } from '../../utils/getDayOfWeek';
import { getCurrentDateWithoutTime } from '../../utils/getDateWithoutTime';
import { formatWorkTime, formatPauseTime } from '../../utils/getHoursMinFromSec';
import { $timer } from '../../store';
import Tomato from '../Tomato/Tomato';
import StatisticCard from '../StatisticCard/StatisticCard';

const StatisticPage = () => {

    const todayDate = getCurrentDateWithoutTime();
    const todayDayOfWeek = getDayOfWeek(todayDate)
    const timer = useStore($timer);
    console.log('todayDate', todayDate);
    const timerActivity = timer.activity;
    const timerWorkSessionsCount = timer.workSessionsCount;
    console.log(timerActivity);

    const getTimerActivityToday = () => {
        if (timerActivity.length === 0) return null;
        const todayActivity = timerActivity.find(activity => activity.date === todayDate);
        if (todayActivity) {
            console.log(todayActivity.date);
            const workData = formatWorkTime(todayActivity.workSec);
            const pauseData = formatPauseTime(todayActivity.pauseSec);
            const stopsData = todayActivity.stopCount;
            const focusTime = `${Math.round(((todayActivity.workSec - todayActivity.pauseSec) / todayActivity.workSec) * 100)} %`;
            return {
                workData,
                pauseData,
                stopsData,
                focusTime,
            };
        }
        else {
            return null
        }
    };
    const timerActivityToday = getTimerActivityToday();
    console.log(timerActivityToday);


    return (
        <div className={styles.statisticContainer}>
            <div className={styles.statHeader}>
                <h2>YOUR ACTIVITY</h2>
                <div className={styles.selectConteiner}>
                    <select className={styles.select}
                        name="time"
                        onChange={() => { }}
                        value='currect'
                    >
                        <option value="current">Эта неделя</option>
                        <option value="last">Прошедшая неделя</option>
                        <option value="twoWeeksAgo">2 недели назад</option>
                    </select>
                </div>
            </div>

            <div className={styles.statContent}>
                <div className={styles.statContentLeft}>

                    <div className={styles.day}>
                        <h4>{todayDayOfWeek}</h4>
                        {timerActivityToday
                            ? <>
                                <span>Вы работали над задачами <br />в течение </span>
                                <span className={styles.red}>{timerActivityToday.workData} </span>
                            </>
                            : <span>Нет данных</span>}
                    </div>

                    <div className={styles.tomato}>
                        <Tomato sessions={timerWorkSessionsCount} />
                    </div>

                </div>
                <TimerChart data={timerActivity} />
            </div>

            <div className={styles.statFooter}>
                <div>
                    <StatisticCard name={'Фокус'} value={timerActivityToday ? timerActivityToday.focusTime : '0%'} icon={'focus'} />
                </div>
                <div>
                    <StatisticCard name={'Время на паузе'} value={timerActivityToday ? timerActivityToday.pauseData: '0м'} icon={'pause'} />
                </div>
                <div>
                    <StatisticCard name={'Остановки'} value={timerActivityToday ? timerActivityToday.stopsData : '0'} icon={'stop'} />
                </div>
            </div>
        </div>
    )
}

export default StatisticPage;
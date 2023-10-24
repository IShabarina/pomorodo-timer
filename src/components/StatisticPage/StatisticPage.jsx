// import DoneBlock from '../DoneBlock/DoneBlock';
import { useStoreMap } from 'effector-react';
import TimerChart from '../TimerChart/TimerChart';
import styles from './StatisticPage.module.css';
import { getDayOfWeek } from '../../utils/getDayOfWeek';
import { getCurrentDateWithoutTime } from '../../utils/getDateWithoutTime';
import { formatWorkTime } from '../../utils/getHoursMinFromSec';
import { $timer } from '../../store';
import Tomato from '../Tomato/Tomato';

const StatisticPage = () => {

    const todayDate = getCurrentDateWithoutTime();

    console.log('todayDate', todayDate);
    const timerActivity = useStoreMap({
        store: $timer,
        keys: ['activity'],
        fn: (state) => state.activity,
    })
    const timerWorkSessionsCount = useStoreMap({
        store: $timer,
        keys: ['workSessionsCount'],
        fn: (state) => state.workSessionsCount,
    })
    console.log(timerActivity);

    const workTimeToday = () => {
        for (const activity of timerActivity) {
            console.log(activity.date, todayDate);

            if (activity.date === todayDate) {
                console.log('worked')
                const workData = formatWorkTime(activity.workSec);
                console.log(workData);
                return workData;
            }
            else {
                return null
            }
        }
    }

    return (
        <div className={styles.statisticContainer}>
            <div className={styles.statHeader}>
                <h2>YOUR ACTIVITY</h2>
                <div className={styles.selectConteiner}>
                    <select className={styles.select}
                        name="time"
                        onChange={() => { }}
                        value='Эта неделя'
                    >
                        <option value="Эта неделя">Эта неделя</option>
                        <option value="Прошедшая неделя">Прошедшая неделя</option>
                        <option value="2 недели назад">2 недели назад</option>
                    </select>
                </div>
            </div>

            <div className={styles.statContent}>
                <div className={styles.statContentLeft}>
                    <div className={styles.day}>
                        <h4>{getDayOfWeek(todayDate)}</h4>
                        <p>{workTimeToday() && timerActivity.length > 0 ? `Вы работали над задачами в течение ${(workTimeToday().hours) ? workTimeToday().hours : ''} ${(workTimeToday().hours) ? workTimeToday().hoursText : ''} ${workTimeToday().minutes} ${workTimeToday().minutesText}` : `Нет данных`}</p>
                    </div>

                    <div className={styles.tomato}>

                        <Tomato sessions={timerWorkSessionsCount}/>

                    </div>
                </div>
                <TimerChart data={timerActivity} />
            </div>

            <div className={styles.statFooter}>
                <div>
                    <h4>Фокус</h4>
                    <span>35%</span>
                </div>
                <div>
                    <h4>Время на паузе</h4>
                    <span>9M</span>
                </div>
                <div>
                    <h4>Остановки</h4>
                    <span>3</span>
                </div>
            </div>
        </div>
    )
}

export default StatisticPage;
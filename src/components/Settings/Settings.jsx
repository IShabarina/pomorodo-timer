import styles from './Settings.module.css';
import stylesSlider from './ReactSlider.module.css';
import ReactSlider from 'react-slider';
import { useStore } from 'effector-react';
import { Button } from '../Button/Button';
import { $settings, changeTimerVisibility, updateSettings } from '../../store';

const Settings = () => {
    const settings = useStore($settings);

    const setTimerIsVisible = () => {
        changeTimerVisibility(true);
    };

    const updateWorkMin = (newWorkMin) => {
        updateSettings({ ...settings, workMin: newWorkMin });
    };

    const updateBreakMin = (newBreakMin) => {
        updateSettings({ ...settings, breakMin: newBreakMin });
    };

    const updateLongBreakMin = (newLongBreakMin) => {
        updateSettings({ ...settings, longBreakMin: newLongBreakMin });
    }

    return (
        <div className={styles.settingsSection}>
            <p className={styles.notice}></p>
            <div className={styles.settingBar}>
                <h2 className={styles.title}>SETTING YOUR INTERVALS</h2>
                <label className={styles.settingsLabel}>WORK {settings.workMin}:00 min </label>
                <ReactSlider
                    className={stylesSlider.slider}
                    thumbClassName={stylesSlider.thumb}
                    trackClassName={stylesSlider.track}
                    value={settings.workMin}
                    onChange={newValue => updateWorkMin(newValue)}
                    min={1}
                    max={25}
                />
                <label className={styles.settingsLabel}>SHOT BREAK {settings.breakMin}:00 min</label>
                <ReactSlider
                    className={`${stylesSlider.slider} ${stylesSlider.green}`}
                    thumbClassName={stylesSlider.thumb}
                    trackClassName={stylesSlider.track}
                    value={settings.breakMin}
                    onChange={newValue => updateBreakMin(newValue)}
                    min={1}
                    max={10}
                />
                <label className={styles.settingsLabel}>LONG BREAK {settings.longBreakMin}:00 min</label>
                <ReactSlider
                    className={`${stylesSlider.slider} ${stylesSlider.yellow}`}
                    thumbClassName={stylesSlider.thumb}
                    trackClassName={stylesSlider.track}
                    value={settings.longBreakMin}
                    onChange={newValue => updateLongBreakMin(newValue)}
                    min={15}
                    max={30}
                />
            </div>
            <div>
                <Button iconcomponent={'back'} onClick={setTimerIsVisible} text={''} iconsize={25} />
            </div>
        </div>
    )
}

export default Settings;
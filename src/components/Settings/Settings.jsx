import styles from './Settings.module.css';
import stylesSlider from './ReactSlider.module.css';
import ReactSlider from 'react-slider';
import { useStore } from 'effector-react';
import { Button } from '../Button/Button';

import { $settings, $settingsVisible } from '../../store';
import { updateSettings, updateSettingsVisible } from '../../event';

// update states:
$settingsVisible
    .on(updateSettingsVisible, (_, newSettingsMode) => newSettingsMode); //action & reducer
$settings
    .on(updateSettings, (_, newSettings) => newSettings); //action & reducer


const Settings = () => {
    const settings = useStore($settings);

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
            <div className={styles.settingBar}>
                <h2 className={styles.title}>Setting your time</h2>
                <label className={styles.settingsLabel}>Work {settings.workMin}:00 min </label>
                <ReactSlider
                    className={stylesSlider.slider}
                    thumbClassName={stylesSlider.thumb}
                    trackClassName={stylesSlider.track}
                    value={settings.workMin}
                    onChange={newValue => updateWorkMin(newValue)}
                    min={1}
                    max={25}
                />
                <label className={styles.settingsLabel}>Shot break {settings.breakMin}:00 min</label>
                <ReactSlider
                    className={`${stylesSlider.slider} ${stylesSlider.green}`}
                    thumbClassName={stylesSlider.thumb}
                    trackClassName={stylesSlider.track}
                    value={settings.breakMin}
                    onChange={newValue => updateBreakMin(newValue)}
                    min={1}
                    max={10}
                />
                <label className={styles.settingsLabel}>Long break {settings.longBreakMin}:00 min</label>
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
                <Button iconcomponent={'back'} onClick={() => { updateSettingsVisible(false) }} text={''} iconsize={25} />
            </div>
        </div>
    )
}

export default Settings;
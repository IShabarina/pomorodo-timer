import styles from './Icon.module.css';
import { PlayIcon } from '../icons/PlayIcon';
import { PauseIcon } from '../icons/PauseIcon';
import { SettingIcon } from '../icons/SettingIcon';
import { BackIcon } from '../icons/BackIcon';
import { StatIcon } from '../icons/StatIcon';
import { DeleteIcon } from '../icons/DeleteIcon';
import { AddIcon } from '../icons/AddIcon';
import { EditIcon } from '../icons/EditIcon';
import { NextIcon } from '../icons/NextIcon';
import { SortIcon } from '../icons/SortIcon';
import { StopIcon } from '../icons/StopIcon';
import { CloseIcon } from '../icons/CloseIcon';

const icons = {
    add: <AddIcon />,
    back: <BackIcon />,
    close: <CloseIcon />,
    delete: <DeleteIcon />,
    edit: <EditIcon />,
    next: <NextIcon />,
    pause: <PauseIcon />,
    play: <PlayIcon />,
    settings: <SettingIcon />,
    sort: <SortIcon />,
    statistic: <StatIcon />,
    stop: <StopIcon />
}

export function Icon({ componentName, size = 15 }) {
    return (
        <div className={styles.iconContainer} style={{ width: size, height: size }}>
            {icons[componentName]}
        </div>
    );
}
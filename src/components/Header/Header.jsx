import { Button } from '../Button/Button';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.mainTitle}>POMODORO</h1>
            <Button
                onClick={() => { }}
                text={''}
                iconcomponent={'statistic'}
                iconsize={35} />
        </header>
    )
}

export default Header;
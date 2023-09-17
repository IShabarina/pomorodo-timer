import { Icon } from '../Icon/Icon';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {

    return (
        <header className={styles.header}>
            <h1 className={styles.mainTitle}>
                <Link to={`/`} title='To Timer Page'>POMODORO</Link>
            </h1>
            <Link to={`/statistic`} title='To Statistic Page'>
                <Icon componentName={'statistic'} size={35} />
            </Link>
        </header>
    )
}

export default Header;
import styles from './AboutItem.module.css';

const AboutItem = ({item, onClick, isOpen}) => {
    return (
        <li className={styles.accordionItem}>
            <button
                className={styles.accordionHeader}
                onClick={() => onClick()}>
                {item.q}
            </button>
            <div
                className={isOpen ?
                    `${styles.accordionCollapse.open}`
                    : `${styles.accordionCollapse}`}>
                <div className={styles.accordionBody}>{item.a}</div>
            </div>
        </li>
    )
}

export default AboutItem;
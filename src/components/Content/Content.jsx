import styles from './Content.module.css';

const Content = ({ children }) => {
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
}

export default Content;
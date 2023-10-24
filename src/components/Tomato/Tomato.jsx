import tomatoEmpty from '../../svg/tomato-empty.svg';
import tomato from '../../svg/tomato.svg';
import styles from './Tomato.module.css';


const Tomato = ({sessions}) => {
    console.log(sessions);
    return (
        <div className={styles.container}>
            {sessions === 0
                ? <img src={tomatoEmpty} alt="tomato empty" />
                : <>
                <div className={styles.top}>
                    <img src={tomato} alt="tomato" width={'81px'} height={'81px'}/>
                    <span>x {sessions}</span>
                </div>
                <div className={styles.bottom}>
                    <span>{sessions} помидора</span>
                </div>
                </>
            }
        </div>
    )
}

export default Tomato;
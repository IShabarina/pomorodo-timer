import tomatoEmpty from '../../svg/tomato-empty.svg';
import tomato from '../../svg/tomato.svg';
import styles from './Tomato.module.css';


const Tomato = ({ sessions }) => {
    return (
        <div className={styles.container}>
            {sessions === 0
                ?
                <div className={styles.tomatoConatainer}>
                    <img src={tomatoEmpty} alt="tomato empty" />
                </div>
                : <>
                    <div className={styles.top}>
                        <img src={tomato} alt="tomato" width={'81px'} height={'81px'} />
                        <span>x {sessions}</span>
                    </div>
                    <div className={styles.bottom}>
                        <span>{sessions} {sessions === 1 ? 'помидор' : sessions < 5 ? 'помидора' : 'помидоров'}</span>
                    </div>
                </>
            }
        </div>
    )
}

export default Tomato;
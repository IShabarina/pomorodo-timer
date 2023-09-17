import { useStore } from "effector-react"
import { $doneList } from "../../store"
import styles from "./DoneBlock.module.css";
import TodoItem from '../TodoItem/TodoItem';


const DoneBlock = () => {
    const doneList = useStore($doneList);


    return (
        <div className={styles.doneSection}>
            <h4>Completed tasks</h4>
            <div className={styles.doneListContainer}>
                <div className={styles.doneList}>
                    {doneList.map(doneItem => (
                        <TodoItem key={doneItem.id} todo={doneItem} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DoneBlock;
import { useStore } from "effector-react"
import { $doneList } from "../../store"
import styles from "./DoneBlock.module.css";
import TodoItem from '../TodoItem/TodoItem';


export const DoneBlock = () => {
    const doneList = useStore($doneList);


    return (
        <div className={styles.doneSection}>
            <h4>Completed</h4>
            <ul className={styles.doneList}>
                {doneList.map(doneItem => (
                    <TodoItem key={doneItem.id} todo={doneItem} />
                ))}
            </ul>
        </div>
    )
}
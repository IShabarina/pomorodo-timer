import { useState } from 'react';
import styles from './About.module.css';
import AboutItem from '../AboutItem/AboutItem';


const aboutList = [
    {
        q: "Pomodoro?!?!",
        a: "The Pomodoro Technique is a time management method developed by college student Francesco Cirillo in the 1980s. At its core, the technique, named after the Italian word for 'tomato', involves multiple time intervals distributed throughout the day and marked on a kitchen timer in the shape of a tomato, which Cirillo himself used when refining his time management method."
    },
    {
        q: "Basic structure of the Pomodoro Technique",
        a: "The basic structure of the Pomodoro Technique, designed to be simple to use while providing significant productivity benefits, consists of the following steps: - Set a goal or task from your to-do list that you need to accomplish. - Set the Pomodoro timer. - Work for the designated time period. - When the timer finishes, mark your work interval as complete. - After each work session, take a 5-minute break. - After the fourth session, take a longer break of 15–30 minutes. - Reset the timer and start the process again"
    },
    {
        q: "How to work with the current application?",
        a: "Start with your task list - plan several tasks for your day and assign an approximate number of 'Pomodoros' for each task that it would take to complete. The top task on the list is your current task",
    },
    {
        q: "How to work with the timer?",
        a: "Once you're ready, start the timer. If you get distracted, pause the timer; the Pomodoro won't count in this case. You can also pause the timer and skip the Pomodoro or break if needed.",
    },
];

const About = () => {
    const [openId, setOpenId] = useState(null);

    return (
        <div className={styles.descriptionContainer}>
            <h2 className={styles.title}>WHAT IS IT?</h2>
            <ul className={styles.accordion}>
                {aboutList.map((item, id) => (
                    <AboutItem
                        item={item}
                        key={id}
                        isOpen={id === openId}
                        onClick={() => (id === openId ? setOpenId(null) : setOpenId(id))}
                    />
                ))}
            </ul>
        </div>
    )
}

export default About;
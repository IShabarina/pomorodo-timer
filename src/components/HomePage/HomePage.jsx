import Settings from "../Settings/Settings";
import Timer from "../Timer/Timer";
import TodoBlock from "../TodoBlock/TodoBlock";
import About from "../About/About";
import { useStoreMap } from "effector-react";
import { $timer } from "../../store";

const HomePage = () => {
       const timerIsVisible = useStoreMap({
        store: $timer,
        keys: [],
        fn: (state) => state.isVisible,
    });

    return (
        <>
            {timerIsVisible ? <Timer /> : <Settings /> }
            <TodoBlock />
            <About />
        </>
    )
}

export default HomePage;
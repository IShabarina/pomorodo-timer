import Settings from "../Settings/Settings";
import Timer from "../Timer/Timer";
import TodoBlock from "../TodoBlock/TodoBlock";
import About from "../About/About";
import { useStore } from "effector-react";
import { $settingsVisible } from "../../store";

const HomePage = () => {
    const settingsVisible = useStore($settingsVisible);

    return (
        <>
            {settingsVisible ? <Settings /> : <Timer />}
            <TodoBlock />
            <About />
        </>
    )
}

export default HomePage;
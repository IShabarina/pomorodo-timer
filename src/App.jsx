import React  from "react";
import './main.global.css';
import { Layout } from "./components/Layout/Layout";
import { Settings } from "./components/Settings/Settings";
import Timer from "./components/Timer/Timer";
import { useStore } from "effector-react";

import { $settingsVisible, $todoList } from "./store";
import { TodoBlock } from "./components/TodoBlock/TodoBlock";
import { DoneBlock } from "./components/DoneBlock/DoneBlock";
import AppDescription from "./components/AppDescription/AppDescription";

// // Effector:
// const updateSettings = createEvent(); //event
// export const $settings = createStore({ workMin:  25, breakMin: 5 }) //store
//   .on(updateSettings, (_, newSettings) => newSettings); //action & reducer
// $settings.watch((state) => { //watcher:
//   console.log('state', state);
// })

function App() {
  // const todoList = useStore($todoList);
  const settingsVisible = useStore($settingsVisible);

  // const [isTimerStarted, setIsTimerStarted] = useState(null);
  // const [isSessionFinished, setIsSessionFinished] = useState(false);

  // const startTodo = () => {
  //   if (todoList.length > 0) {
  //     setIsTimerStarted(true);
  //     // setTaskSessionCount(0);
  //     console.log('timer is working!');
  //   }
  // }

  // const changeTodo = () => {
  //   setIsSessionFinished(true);
  //   console.log('задача  завершена!');
  // }

  return (
    <Layout>
      {settingsVisible
        ? <Settings />
        // : <Timer onStart={startTodo} onWorkSessionFinish={changeTodo} />}
        : <Timer />}
      <TodoBlock />
      <DoneBlock />
      <AppDescription />
    </Layout>
  );
}

export default App;

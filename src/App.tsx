import React, { useState } from "react";
import Timer from "./components/Timer/Timer";
import Settings from "./components/Settings/Settings";
import { useLocalStorage } from "./services/localStorage";

export default function App() {
  const [start, setStart] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

  const [workTime, setWorkTime] = useLocalStorage("work-time", 1500); //25 minutos
  const [restTime, setRestTime] = useLocalStorage("rest-time", 300); // 5 minutos

  const changeWorkTime = (pomodoro: any, rest: any) => {
    setWorkTime(parseInt(pomodoro.current.value) * 60);
    setRestTime(parseInt(rest.current.value) * 60);
  };

  const handleToggle = () => {
    setStart(true);
    if (!toggle) setToggle(true);
    else setToggle((toggle) => !toggle);
  };

  return (
    <div className="App">
      <Settings
        handleToggle={handleToggle}
        toggle={toggle}
        start={start}
        changeWorkTime={changeWorkTime}
        workTime={workTime}
        restTime={restTime}
      />
      <Timer
        handleToggle={handleToggle}
        workTime={workTime}
        restTime={restTime}
      />
    </div>
  );
}

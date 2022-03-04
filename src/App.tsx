import React, { useState } from 'react';
import Timer from './components/Timer/Timer';
import Settings from './components/Settings/Settings';
import { useLocalStorage } from './services/localStorage';

function App() {

  const [ toggle, setToggle ] = useState<boolean>(false);

  var [ workTime, setWorkTime ] = useLocalStorage('work-time', 1500); //25 minutos
  var [ restTime, setRestTime] = useLocalStorage('rest-time', 300); // 5 minutos

  var [ start, setStart] = useState(false);

  const changeWorkTime = (pomodoro: any, rest: any) => {
    setWorkTime(workTime = parseInt(pomodoro.current.value) * 60);
    setRestTime(restTime = parseInt(rest.current.value) * 60);
  }

  const handleToggle = () => {
    setStart(start = true);
    if (!toggle) setToggle(true);
    else setToggle(toggle => !toggle);
  }

  return (
    <div className="App">
      <Settings handleToggle={handleToggle} toggle={toggle} start={start} changeWorkTime={changeWorkTime} workTime={workTime} restTime={restTime} />
      <Timer handleToggle={handleToggle} workTime={workTime} restTime={restTime} />
    </div>
  );
}

export default App;

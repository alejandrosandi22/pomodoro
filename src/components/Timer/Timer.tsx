import React, { useState } from "react";
import Clock from "../Clock";
import "./Timer.scss";

function Timer(props: any) {
  const [counter, setCounter] = useState<number>(0);

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="timer-container">
      <div className="title-wrapper">
        <h1 className="title">Pomodoro</h1>
        <i onClick={props.handleToggle} className="fas fa-cog"></i>
      </div>
      <div className="clock-container">
        <Clock
          increaseCounter={increaseCounter}
          workTime={props.workTime}
          restTime={props.restTime}
        />
      </div>
      <div className="counter-wrapper">
        <h3 className="counter">{counter}</h3>
      </div>
    </div>
  );
}

export default React.memo(Timer);

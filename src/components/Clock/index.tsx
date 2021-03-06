import React, { useEffect, useRef, useState } from "react";
import "./index.scss";

export default function Clock(props: any) {
  const time = useRef<number>(0);

  const interval = useRef<any>(null);

  const seconds = useRef<number>(0);
  const minutes = useRef<number>(props.workTime / 60);

  const [timeToShow, setTimeToShow] = useState<string>(
    `${props.workTime / 60}:00`
  );

  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [changeState, setChangeState] = useState<boolean>(false);

  const [progressLeft, setProgressLeft] = useState<object>({});
  const [progressRight, setProgressRight] = useState<object>({});

  useEffect(() => {
    time.current = 0;
    seconds.current = 0;
    if (!changeState) {
      setTimeToShow(`${props.workTime / 60}:00`);
      minutes.current = props.workTime / 60;
    } else {
      setTimeToShow(`${props.restTime / 60}:00`);
      minutes.current = props.restTime / 60;
    }
  }, [changeState, props.workTime, props.restTime]);

  const progressStyle = () => {
    if (!startTimer) {
      let timerTime: number = !changeState ? props.workTime : props.restTime;

      setProgressLeft({
        transform: `rotate(${
          time.current <= timerTime / 2
            ? (time.current * 180) / (timerTime / 2)
            : 180
        }deg)`,
        backgroundColor: time.current === timerTime ? "#B33030" : "#357C3C",
      });
      if (time.current > timerTime / 2) {
        setProgressRight({
          transform: `rotate(${
            time.current > timerTime / 2
              ? ((time.current - timerTime / 2) * 180) / (timerTime / 2)
              : 180
          }deg)`,
          backgroundColor: time.current === timerTime ? "#B33030" : "#357C3C",
        });
      } else setProgressRight({});
    } else {
      setProgressLeft({});
      setProgressRight({});
    }
  };

  const timerFormat = (minutes: number, seconds: number) => {
    let secondsFormat: string = "00";
    let minutesFormat: string = `${props.workTime / 60}`;

    if (seconds < 10) secondsFormat = `0${seconds}`;
    else secondsFormat = `${seconds}`;

    if (minutes < 10) minutesFormat = `0${minutes}`;
    else minutesFormat = `${minutes}`;

    return `${minutesFormat}:${secondsFormat}`;
  };

  const handleStartWorkTimer = () => {
    if (!startTimer) {
      setStartTimer(true);

      interval.current = setInterval(() => {
        time.current++;

        if (seconds.current > 0) seconds.current--;
        else seconds.current = 59;
        if (seconds.current === 59) minutes.current--;

        progressStyle();

        setTimeToShow(timerFormat(minutes.current, seconds.current));

        if (time.current === props.workTime) {
          time.current = 0;
          setTimeToShow(`${props.restTime / 60}:00`);
          minutes.current = props.restTime / 60;
          seconds.current = 0;
          setChangeState(true);
          setStartTimer(false);
          props.increaseCounter();
          clearInterval(interval.current);
        }
      }, 1000);
    } else {
      setStartTimer(false);
      clearInterval(interval.current);
    }
  };

  const handleStartRestTimer = () => {
    if (!startTimer) {
      setStartTimer(true);

      interval.current = setInterval(() => {
        time.current++;

        if (seconds.current > 0) seconds.current--;
        else seconds.current = 59;
        if (seconds.current === 59) minutes.current--;

        progressStyle();

        setTimeToShow(timerFormat(minutes.current, seconds.current));

        if (time.current === props.restTime) {
          time.current = 0;
          setTimeToShow(`${props.workTime / 60}:00`);
          minutes.current = props.workTime / 60;
          seconds.current = 0;
          setChangeState(false);
          setStartTimer(false);
          clearInterval(interval.current);
        }
      }, 1000);
    } else {
      setStartTimer(false);
      clearInterval(interval.current);
    }
  };

  return (
    <div className="clock-wrapper">
      <div className="inside">
        <h2 className="timer">{timeToShow}</h2>
        <i
          onClick={!changeState ? handleStartWorkTimer : handleStartRestTimer}
          className={`fas ${!startTimer ? "fa-play" : "fa-pause"} actions`}
        ></i>
      </div>
      <div className="left">
        <span style={progressLeft} className="progress"></span>
      </div>
      <div className="right">
        <span style={progressRight} className="progress"></span>
      </div>
    </div>
  );
}

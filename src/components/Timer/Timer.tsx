import React, { useRef, useState } from 'react';
import './Timer.scss';

function Clock(props: any) {
  const time = useRef<number>(0);
  const interval = useRef<any>(null);
  
  const workTime = useRef<number>(1500); //25 minutos
  const restTime = useRef<number>(300); // 5 minutos
  const seconds = useRef<number>(0);
  const minutes = useRef<number>(workTime.current / 60);

  const [ timeToShow, setTimeToShow ] = useState<string>(`${workTime.current / 60}:00`);

  const [ startTimer, setStartTimer ] = useState<boolean>(false);
  const [ changeState, setChangeState ] = useState<boolean>(false)
  
  const [ progressLeft, setProgressLeft ] = useState<object>({});
  const [ progressRight, setProgressRight ] = useState<object>({});

  const progressStyle = () => {
    if (!startTimer) {

      let timerTime: number = !changeState ? workTime.current : restTime.current;

        setProgressLeft({
          transform: `rotate(${time.current <= (timerTime / 2) ? ((time.current * 180) / (timerTime / 2)) : 180}deg)`,
          backgroundColor: time.current === timerTime ? '#B33030' : '#357C3C'
        })
        if (time.current > (timerTime / 2)) {
          setProgressRight({
            transform: `rotate(${time.current > (timerTime / 2) ? (((time.current - timerTime / 2) * 180) / (timerTime / 2)) : 180}deg)`,
            backgroundColor: time.current === timerTime ? '#B33030' : '#357C3C'
          })
        } else setProgressRight({});
    } else {
      setProgressLeft({});
      setProgressRight({});
    }
  }
  const timerFormat = (minutes: number, seconds: number) => {

    let secondsFormat: string = '00';
    let minutesFormat: string = `${workTime.current / 60}`;

    if (seconds < 10) secondsFormat = `0${seconds}`;
    else secondsFormat = `${seconds}`;
    
    if (minutes < 10) minutesFormat = `0${minutes}`;
    else minutesFormat = `${minutes}`;

    return `${minutesFormat}:${secondsFormat}`;
  }

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

        if (time.current === workTime.current) {
          time.current = 0;
          minutes.current = (restTime.current / 60)
          seconds.current = 0;
          setChangeState(true)
          setStartTimer(false);
          props.increaseCounter();
          clearInterval(interval.current);
        }
      }, 1);
      
    } else {
      setStartTimer(false);
      clearInterval(interval.current);
    }
  }

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

        if (time.current === restTime.current) {
          time.current = 0;
          minutes.current = (workTime.current / 60)
          seconds.current = 0;
          setChangeState(false)
          setStartTimer(false);
          clearInterval(interval.current);
        }
      }, 10);
      
    } else {
      setStartTimer(false);
      clearInterval(interval.current);
    }
  }

  return(
    <div className='clock-wrapper'>
      <div className='inside'>
        <h2 className='timer'>{ timeToShow }</h2>
        <i onClick={!changeState ? handleStartWorkTimer : handleStartRestTimer} className={`fas ${!startTimer ? 'fa-play' : 'fa-pause'} actions`}></i>
      </div>
      <div className='left'>
        <span style={progressLeft} className='progress'></span>
      </div>
      <div className='right'>
        <span style={progressRight} className='progress'></span>
      </div>
    </div>
  );
}

export default function Timer() {

  const [ counter, setCounter ] = useState<number>(0);

  const increaseCounter = () => {
    setCounter(counter + 1);
  }

  return (
    <div className="timer-container">
      <div className='title-wrapper'>
        <h1 className='title'>Pomodoro</h1>
        <i className='fas fa-cog'></i>
      </div>
      <div className='clock-container'>
        <Clock increaseCounter={increaseCounter}/>
      </div>
      <div className='counter-wrapper'>
        <h3 className='counter'>{ counter }</h3>
      </div>
    </div>
  );
}

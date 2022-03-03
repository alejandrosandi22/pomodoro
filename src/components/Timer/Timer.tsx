import React, { useRef, useState } from 'react';
import './Timer.scss';



function Clock(props: any) {
  const time = useRef<number>(0);
  const rightTime = useRef(0);
  const seconds = useRef<number>(0);
  const minutes = useRef<number>(25);
  const interval = useRef<any>(null);
  
  const [ startTime, setStartTime ] = useState<number>(1500); //25 minutos
  const [ breakTime, setBreakTime ] = useState<number>(300); // 4 minutos
  const [ timeToShow, setTimeToShow ] = useState<string>(`${startTime / 60}:00`);
  
  const [ progressLeft, setProgressLeft ] = useState<object>({});
  const [ progressRight, setProgressRight ] = useState<object>({});
  
  var [ start, setStart ] = useState<boolean>(false);
  var [ rest, setRest ] = useState<boolean>(false);


  const progressStyle = () => {
    if (start) { 
        setProgressLeft({
          transform: `rotate(${time.current <= (startTime / 2) ? ((time.current * 180) / (startTime / 2)) : 180}deg)`,
          backgroundColor: time.current === startTime ? '#B33030' : '#357C3C'
        })
          setProgressRight({
            transform: `rotate(${rightTime.current <= (startTime / 2) ? ((rightTime.current * 180) / (startTime / 2)) : 180}deg)`,
            backgroundColor: time.current === startTime ? '#B33030' : '#357C3C'
          })
    } else {
      setProgressLeft({});
      setProgressRight({});
    }
  }

  const startTimer = () => {

    let secondsFormat: string = '00';
    let minutesFormat: string = (startTime / 60).toString();
    
    if (!start && !rest) {
      setStart(start = true);
      interval.current = setInterval(() => {
      time.current++;
      if (time.current >= (startTime / 2)) rightTime.current++;
      progressStyle();

        if (seconds.current > 0) seconds.current--;
        else seconds.current = 59;
        
        if (seconds.current === 59) minutes.current--;
        
        if (seconds.current < 10) secondsFormat = `0${seconds.current}`;
        else secondsFormat = `${seconds.current}`;
        
        if (minutes.current < 10) minutesFormat = `0${minutes.current}`;
        else minutesFormat = `${minutes.current}`;
        
        if (time.current === startTime) {
          setRest(rest = true);
          minutes.current = (breakTime / 2);
          setStart(start = false);
          time.current = 0;
          rightTime.current = 0;
          minutes.current = startTime / 60;
          seconds.current = 0;
          clearInterval(interval.current);
          props.increaseCounter();
        }
        
        setTimeToShow(`${minutesFormat}:${secondsFormat}`);
        
      },1)
    } else {
      setStart(start = false);
      clearInterval(interval.current);
    }
  }

  return(
    <div className='clock-wrapper'>
      <div className='inside'>
        <h2 className='timer'>{ timeToShow }</h2>
        <i onClick={startTimer} className={`fas ${!start ? 'fa-play' : 'fa-pause'} actions`}></i>
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

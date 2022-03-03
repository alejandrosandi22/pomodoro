import React, { useEffect, useRef } from 'react';
import './Settings.scss';

export default function Settings(props: any) {

  const toggleContainer = useRef<object>({});
  const toggleSettings = useRef<object>({}); 

  const validateInput = (e: any) => {

    const input: any = e.target;

    const validCharacters: Array<number> = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    if (parseInt(input.value) > 59) input.value = '59';

    const separate: Array<string> = input.value.split("");

    for (let i = 0; i < separate.length; i++) {
      if (!validCharacters.toString().includes(separate[i])) input.value = '';
    }

  }

  useEffect(() => {
    if (props.start) {
      toggleContainer.current = {animation: props.toggle ? 'show-container .5s both' : 'hide-container .5s both'};
      toggleSettings.current = {animation: props.toggle ? 'show-settings .5s both' : 'hide-settings .6s both'};
    }  
  }, [props.start, props.toggle])

  return (
    <div className='settings-container' style={toggleContainer.current}>
      <div className='settings' style={toggleSettings.current}>
        <div className='title-wrapper'>
          <h4 className='title'>Settings</h4>
          <i onClick={props.handleToggle} className='fas fa-times'></i>
        </div>
        <div className='time-settings-wrapper'>
          <h5 className='subtitle'>Time (minutes)</h5>
          <div className='inputs-container'>
            <div className='wrapper'>
              <label htmlFor="number">Pomodoro</label>
              <input onChange={(e) => validateInput(e)} min="1" max="59" className='number' type="text" name="number" id="numer" />
            </div>
            <div className='wrapper'>
              <label htmlFor="">Rest</label>
              <input onChange={(e) => validateInput(e)}  min="1" max="59" className='number' type="text" name="rest" id="rest" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

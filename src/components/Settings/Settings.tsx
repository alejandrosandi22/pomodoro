import React, { useEffect, useRef } from "react";
import "./Settings.scss";

function Settings(props: any) {
  const pomodoro = useRef<HTMLInputElement>(null);
  const rest = useRef<HTMLInputElement>(null);

  const validateInput = (e: any) => {
    const input: any = e.target;

    const validCharacters: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    if (parseInt(input.value) > 59) input.value = "59";

    const separate: Array<string> = input.value.split("");

    for (let i = 0; i < separate.length; i++) {
      if (!validCharacters.toString().includes(separate[i])) input.value = "";
    }
  };

  const save = () => {
    props.changeWorkTime(pomodoro, rest);
    props.handleToggle();
  };

  useEffect(() => {
    pomodoro.current.value = (props.workTime / 60).toString();
    rest.current.value = (props.restTime / 60).toString();
  }, [props.restTime, props.workTime]);

  return (
    <div
      className={`settings-container ${props.toggle ? "show" : "hide"} ${
        !props.start ? "preload" : ""
      }`}
    >
      <div className="settings">
        <div className="title-wrapper">
          <h4 className="title">Settings</h4>
          <i onClick={props.handleToggle} className="fas fa-times"></i>
        </div>
        <div className="time-settings-wrapper">
          <h5 className="subtitle">Time (minutes)</h5>
          <div className="inputs-container">
            <div className="wrapper">
              <label htmlFor="work">Pomodoro</label>
              <input
                ref={pomodoro}
                onChange={(e) => validateInput(e)}
                placeholder={(props.workTime / 60).toString()}
                min="1"
                max="59"
                className="number"
                type="text"
                name="wrok"
                id="work"
                required
              />
            </div>
            <div className="wrapper">
              <label htmlFor="rest">Rest</label>
              <input
                ref={rest}
                onChange={(e) => validateInput(e)}
                placeholder={(props.restTime / 60).toString()}
                min="1"
                max="59"
                className="number"
                type="text"
                name="rest"
                id="rest"
                required
              />
            </div>
          </div>
        </div>
        <div className="button-wrapper">
          <button className="save" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Settings);

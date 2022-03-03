import React, { useState } from 'react';
import Timer from './components/Timer/Timer';
import Settings from './components/Settings/Settings';

function App() {

  var [ start, setStart] = useState<boolean>(false);
  const [ toggle, setToggle ] = useState<boolean>(false);

  const handleToggle = () => {
    setStart(start = true);
    console.log('start',start)
    if (!toggle) setToggle(true);
    else setToggle(false);
  }

  return (
    <div className="App">
      <Settings handleToggle={handleToggle} toggle={toggle} start={start} />
      <Timer handleToggle={handleToggle} />
    </div>
  );
}

export default App;

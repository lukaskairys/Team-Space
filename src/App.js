import React, { useEffect, useState } from "react";
import { ReactComponent as SourceryLogo } from "assets/logo.svg";
import { GetStartedList } from "features/getStarted/components/GetStartedList";

function App() {
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3008/instructions")
      .then((res) => res.json())
      .then(
        (result) => {
          setInstructions(result);
        },
        (error) => {
          // handle error here
        }
      );
  }, []);

  return (
    <div className="app">
      <header className="App-header">
        <SourceryLogo />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <GetStartedList key={instructions.length} instructions={instructions} />
    </div>
  );
}

export default App;

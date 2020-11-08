import React from "react";
import FetchWeather from "./components/Weather/WeatherAPI";

function App() {
  // const [instructions, setInstructions] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3008/instructions")
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setInstructions(result);
  //       },
  //       (error) => {
  //         // handle error here
  //       }
  //     );
  // }, []);

  return (
    <div className="app">
      <FetchWeather />
      {/* <header className="App-header">
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
      <GetStartedList key={instructions.length} instructions={instructions} /> */}
    </div>
  );
}

export default App;

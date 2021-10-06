import React from "react";
// import JokeList from "./JokeList";
import JokeListClass from "./JokeListClass";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <JokeListClass />
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       {/* <JokeListClass /> */}
//       <JokeList />
//     </div>
//   );
// }

export default App;

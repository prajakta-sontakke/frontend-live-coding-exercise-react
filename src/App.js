import React, { Component } from "react";
import Questionnaire from "./Questionnaire";

class App extends Component {
  state = {
  };


  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <div>
            <h1>Yes/No Questions</h1>
            <Questionnaire />
          </div>
        </main>
      </div>
    );
  }
}

export default App;

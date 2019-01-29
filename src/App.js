import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Game from './Models/Game';

import SheetJSApp from './CommonControls/ReadFile';
import ReadExcel from './CommonControls/ReadFileByMyself';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Helloworld">
          <Game />
          <SheetJSApp/>
          {/* <ReadExcel /> */}
        </div>
      </div>
    );
  }
}

export default App;

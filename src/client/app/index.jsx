console.log('Hello World brother!');

import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <p> Hello React! I am finally in!</p>;
  }
}

render(<App/>, document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';
import { IconButton } from './index';

class App extends React.Component {
    render() {
        return (
          <div>
            <h1>Welcome to REACT!</h1>
            <IconButton />
          </div>
            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
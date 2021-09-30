import './App.css';
import React from 'react';

class Form extends React.Component {
  render() {
    const { submitted } = this.props;

    return (
      <div className="wrapper">
        <div className={`form ${submitted ? 'shake' : ''}`}>
          <div className="title">Login</div>
          <div>
            <input className="input" placeholder="Username" />
          </div>
          <div>
            <input className="input" placeholder="Password" type="password" />
          </div>
          <div className={`button ${submitted ? 'submitted' : ''}`}>Log In</div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return <Form submitted />;
  }
}

export default App;

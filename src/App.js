import './App.css';
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Styled components
const Title = styled.div`
  text-align: center;
  padding-bottom: 5px;
`;

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
`;

const Form = styled.div`
  background-color: white;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 10px;
  animation: ${props => (props.submitted ? shake : null)} 0.5s linear 1;
`;

const Input = styled.input`
  margin: 10px;
  padding: 5px;
  border: none;
  border-radius: 5px;
`;

const Button = styled.div`
  background-color: ${props => (props.submitted ? 'gray' : '#1890ff')};
  padding: 5px;
  text-align: center;
  border-radius: 5px;
  margin: 10px;
  color: white;
  cursor: pointer;
`;

const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
    };
  }

  render() {
    return (
      <Wrapper>
        <Form submitted={this.state.submitted}>
          <Title>Login</Title>
          <div>
            <Input placeholder="Username" />
          </div>
          <div>
            <Input placeholder="Password" type="password" />
          </div>
          <Button
            submitted={this.state.submitted}
            onClick={() => {
              this.setState({
                submitted: true,
              });
            }}
          >
            Log In
          </Button>
        </Form>
      </Wrapper>
    );
  }
}

export default App;

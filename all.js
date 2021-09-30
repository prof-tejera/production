// Small state example (counter), then show Homework 3 solution with state included
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  render() {
    return (
      <div>
        <h3>Count: {this.state.counter}</h3>
        <button onClick={() => this.setState({ counter: this.state.counter + 1 })}>+</button>
        <button onClick={() => this.setState({ counter: this.state.counter - 1 })}>-</button>
      </div>
    );
  }
}

// Extending - don't do this
class GenericInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  validate = newValue => {
    if (this.props.validate) return this.props.validate(newValue);
    return true;
  };

  render() {
    const { type = 'text', value, onChange, placeholder } = this.props;

    return (
      <input
        type={type}
        value={value}
        placeholder={placeholder || 'GenericInput'}
        onChange={e => {
          const { value: newValue } = e.target;

          // If invalid input, don't set it
          if (!this.validate(newValue)) return;

          // It's valid, lets tell parent and update state
          if (onChange) {
            onChange(newValue);
          }

          this.setState({
            value: newValue,
          });
        }}
      />
    );
  }
}

class IntegerInput extends GenericInput {
  constructor(props) {
    super(props);
  }

  validate = v => {
    console.log('Calling IntegerInput Validate', v);

    try {
      // handle empty
      if (v.length === 0) return true;

      if (isNaN(v)) return false;

      const number = parseFloat(v);
      return Number.isInteger(number);
    } catch (e) {
      return false;
    }
  };
}

// Instead do:
class IntegerInput extends React.Component {
  validate = v => {
    console.log('Calling IntegerInput Validate', v);

    try {
      // handle empty
      if (v.length === 0) return true;

      if (isNaN(v)) return false;

      const number = parseFloat(v);
      return Number.isInteger(number);
    } catch (e) {
      return false;
    }
  };

  render() {
    return <GenericInput {...this.props} validate={this.validate} />;
  }
}

// ------------------------------------------------------------------------------------------
// PROP TYPES
// ------------------------------------------------------------------------------------------

// How do we validate that our component receives what it needs?
// - TypeScript: adds strict typing on top of JS (https://www.typescriptlang.org/)
// - prop-types: official package from FB to validate props passed to components

class RadioButton extends Component {
  render() {
    const { value, label, onClick } = this.props;
    return (
      <button
        onClick={() => {
          onClick(value);
        }}
      >
        {label}
      </button>
    );
  }
}

// Define the type of properties that we expect
RadioButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

// PropType errors will not throw a runtime error (i.e. it will still render)
// so the component will still render -> CHECK OUT DEV TOOLS!
class App extends Component {
  render = () => <RadioButton />;
}

// Fundamental types
RadioButton.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
  optionalObject: PropTypes.object,
};

// React types
RadioButton.propTypes = {
  optionalNode: PropTypes.node, // anything that can be rendered
  optionalElement: PropTypes.element, // specifically a react element
  optionalElementType: PropTypes.elementType, // a string which is the a native HTML element's type ('textearea', 'div') or the actual class {MyClass}
  optionalInstance: PropTypes.instanceOf(MyClass), // an instance of a specific class
};

class MyComponent extends React.Component {
  render() {
    const { p1, p2, p3, p4, children, level = 0 } = this.props;

    const P3 = p3;

    return (
      <div className={`my-component level-${level}`}>
        <p>p1: {p1}</p>
        <p>p2: {p2}</p>
        {P3 && (
          <div>
            <P3 level={level + 1}>Hi</P3>
          </div>
        )}
        <p>p4: {p4 && p4.f1()}</p>
        <p>Children: {children}</p>
      </div>
    );
  }
}

MyComponent.propTypes = {
  p1: PropTypes.node, // anything that can be rendered
  p2: PropTypes.element, // specifically a react element
  p3: PropTypes.elementType,
  p4: PropTypes.instanceOf(Test),
};

class Test {
  f1 = () => Math.random();
}

class App extends React.Component {
  render() {
    return (
      <div>
        <MyComponent p1="abc" p2={<b>test</b>} p3={MyComponent} p4={new Test()} />
      </div>
    );
  }
}

// Allowing more than 1 type
MyComponent.propTypes = {
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Message)]),
};

// Example
MyComponent.propTypes = {
  p1: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// Validating arrays
MyComponent.propTypes = {
  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
};

// Validating objects
MyComponent.propTypes = {
  // An object with all property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),
  // Object with shape (allows +- keys)
  optionalObjectWithShape: PropTypes.shape({
    a: PropTypes.string,
    b: PropTypes.number,
  }),
  // Object with specific keys (you can have less keys than these, but not more)
  optionalObjectWithShape: PropTypes.exact({
    a: PropTypes.string,
    b: PropTypes.number,
  }),
};

// Example
class Avatar extends Component {
  render() {
    const { user } = this.props;
    const { fullName, email } = user;

    return (
      <div>
        <div>{fullName}</div>
        <div>{email}</div>
      </div>
    );
  }
}

Avatar.propTypes = {
  // More relaxed
  user: PropTypes.objectOf(PropTypes.string),
  // More strict
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    // with this option we can include additional properties
  }),
  // Strictest
  user: PropTypes.exact({
    fullName: PropTypes.string,
    email: PropTypes.string,
    // no additional properties accepted
  }),
};

// So far we haven't made anything required, just specified the type
// Any proptype can be made a required field
Avatar.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  // Anything is allowed as long as its provided
  user: PropTypes.any.isRequired,
};

// Default values
Avatar.defaultProps = {
  // if p1 is not provided, it will be set to 1
  p1: 1,
  // note that in this case, if a user is provided without a fullName,
  // if will NOT be set to 'Default User'. This will only happen if the
  // user prop is not provided at all
  user: {
    fullName: 'Default User',
  },
};

// Its useful to create our own PropTypes so we
// don't have to repeat the definition everywhere
const MyPropTypes = {
  user: PropTypes.exact({
    fullName: PropTypes.string,
    email: PropTypes.string,
  }),
};

// Then use as:
Avatar.propTypes = {
  user: MyPropTypes.user,
};

// Styling ---------------------------------------------------------------------------------------------

// - css pre-processors
// npm i --save node-sass
// change imports to .scss

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

// Using classNames ->
import classNames from 'classnames';

const formClasses = [
  {
    form: true,
    shake: this.state.submitted,
  },
];

<div className={classNames(formClasses)}></div>;

const Styles = {
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  title: {
    textAlign: 'center',
    paddingBottom: '5px',
  },
  form: {
    backgroundColor: 'white',
    boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    borderRadius: '10px',
  },
  input: {
    margin: '10px',
    padding: '5px',
    border: 'none',
    borderRadius: '5px',
  },
  button: {
    padding: '5px',
    textAlign: 'center',
    borderRadius: '5px',
    margin: '10px',
    color: 'white',
    cursor: 'pointer',
  },
};

class Form extends React.Component {
  render() {
    const { submitted } = this.props;

    return (
      <div style={Styles.wrapper}>
        <div style={Styles.form}>
          <div style={Styles.title}>Login</div>
          <div>
            <input style={Styles.input} placeholder="Username" />
          </div>
          <div>
            <input style={Styles.input} placeholder="Password" type="password" />
          </div>
          <div
            style={{
              ...Styles.button,
              backgroundColor: submitted ? 'gray' : '#1890ff',
            }}
          >
            Log In
          </div>
        </div>
      </div>
    );
  }
}

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

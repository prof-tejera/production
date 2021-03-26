// Minor thing about homework that I saw a lot of people doing:
class MyComponent extends React.Component {
  render() {
    const { nPages } = this.props;

    // This loop is unnecessary
    const indexes = [];
    for (let i = 0; i < nPages; i++) {
      indexes.push(i);
    }

    const pages = indexes.map(i => {
      return <div key={i}>Page {i}</div>;
    });

    // no need for this
    pages.unshift(<div key="<">{'<'}</div>);
    pages.push(<div key={'>'}>{'>'}</div>);

    return <>{pages}</>;
  }
}

class MyComponent extends React.Component {
  render() {
    const { nPages } = this.props;

    const pages = [];
    for (let i = 0; i < nPages; i++) {
      indexes.push(<div key={i}>Page {i}</div>);
    }

    return (
      <>
        <div>{'<'}</div>
        {pages}
        <div>{'>'}</div>
      </>
    );
  }
}

class GenericInput extends React.Component {
  validate = () => {
    console.log('Calling Generic Validate');
    return true;
  };

  render() {
    const { type = 'text', value, onChange } = this.props;
    return (
      <input
        {...{ type, value }}
        onChange={e => {
          const { value: newValue } = e.target;

          // If invalid input, don't set it
          if (!this.validate(newValue)) return;

          // It's valid, lets tell parent
          onChange(newValue);
        }}
      />
    );
  }
}

class IntegerInput extends GenericInput {
  validate = v => {
    console.log('Calling IntegerInput Validate', v);

    try {
      // handle empty
      if (v.length === 0) return true;

      const number = parseFloat(v);
      return Number.isInteger(number);
    } catch (e) {
      return false;
    }
  };
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      number: '',
      integer: '',
    };
  }

  render() {
    return [
      {
        label: 'Text',
        stateKey: 'text',
      },
      {
        label: 'Numeric Input',
        stateKey: 'number',
        type: 'number',
      },
      {
        label: 'Integer Input',
        stateKey: 'integer',
        type: 'number',
        component: IntegerInput,
      },
    ].map(item => {
      const ComponentClass = item.component || GenericInput;

      return (
        <div key={item.stateKey} className="input">
          <div style={{ width: '130px', paddingRight: '10px' }}>{item.label}</div>
          <ComponentClass
            type={item.type}
            value={this.state[item.stateKey]}
            onChange={v => {
              this.setState({ [item.stateKey]: v });
            }}
          />
        </div>
      );
    });
  }
}

// How to disable the blue box that Webkit browsers add around inputs or focusable elements
```css
button:focus {
  outline: 0;
}
```;

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
  optionalElementType: PropTypes.elementType, // a string which is the element's type ('textearea', 'div') or the actual class {MyClass}
  optionalInstance: PropTypes.instanceOf(MyClass), // an instance of a specific class
};

class MyComponent extends Component {
  render = () => <div>MyComponent</div>;
}

// Example
MyComponent.propTypes = {
  p1: PropTypes.node, // anything that can be rendered
  p2: PropTypes.element, // specifically a react element
  p3: PropTypes.elementType,
  p4: PropTypes.instanceOf(MyComponent),
};

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
  user: {
    fullName: 'Default User',
  },
};

// Its useful to create our own PropTypes so we
// don't have to repeat the definition everywhere

// Styling ---------------------------------------------------------------------------------------------

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
    };
  }

  render() {
    return (
      <div className="wrapper">
        <div className={`form ${this.state.submitted ? 'shake' : ''}`}>
          <div className="title">Login</div>
          <div>
            <input className="input" placeholder="Username" />
          </div>
          <div>
            <input className="input" placeholder="Password" type="password" />
          </div>
          <div
            className={`button ${this.state.submitted ? 'submitted' : ''}`}
            onClick={() => {
              this.setState({
                submitted: true,
              });
            }}
          >
            Log In
          </div>
        </div>
      </div>
    );
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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
    };
  }

  render() {
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
              backgroundColor: this.state.submitted ? 'gray' : '#1890ff',
            }}
            onClick={() => {
              this.setState({
                submitted: true,
              });
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

// - css pre-processors
// npm i --save node-sass
// change imports to .scss

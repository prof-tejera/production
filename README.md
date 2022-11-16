# React App Hardening

As we mentioned in our very first lecture, Javascript is not a strictly typed language. That gives developers quite a bit of freedom, at the expense of allowing bugs to slip through that could easily be caught by enforcing types. By default, Create React App enforces some rules through ESLint, but this still leaves us exposed. In this lecture we'll explore alternatives to harden our applications and catch bugs before they happen or at least be notified after they do.

### TypeScript

TypeScript, as its website describes, is "... a strongly typed programming language that builds on JavaScript...". In short, it allows us to define types and forces us to adhere to them. Most editors support TypeScript either natively or through plugins, so similarly to ESLint, we are warned as we write our code if any rule is not followed. Futher, TypeScript does not require support from the clients where our code will run as it converts to JavaScript before. 

We will not cover TypeScript in this course but you it's very common and you surely will encounter it in production applications so it's worth learning it. You can read more [here](https://www.typescriptlang.org/). We encourage you to run at least some Hello World examples to get familiar with it.

### Prop-Types

As we know, React is a very opinionated framework. If we don't follow its rules, it will make sure we know about it with verbose and usually gnarly logs. However, when we define components, we have complete freedom in terms of the `props` they can receive (except for some protected names like `children`. This makes sense as it would be quite limiting otherwise. However, it does provide us with a module called PropTypes (`prop-types`, installed separately) to enforce types for the `props` our component receives. This is very useful when our components are to be used by other developers since we can protect them (and us!) from passing incorrect arguments. Let's see how this works:

```jsx
import PropTypes from 'prop-types';

const SimpleButton = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
}

// Define the type of properties that we expect
RadioButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

const App = () => {
  return <div>
    <SimpleButton
      label="Test 1"
      onClick={() => {
        console.log('clicked 1');
      }}
    />
    <SimpleButton
      label={1} 
      onClick={() => {
        console.log('clicked 2');
      }}
    />
  </div>
}
```

Now if we look at our console, we can notice we have a wordy warning:

<div style="color: red; background: white; padding: 20px; margin: 10px 0px;">
Warning: Failed prop type: Invalid prop `label` of type `number` supplied to `SimpleButton`, expected `string`.
    at SimpleButton (http://localhost:3001/main.299a5a5df3e9c775d348.hot-update.js:25:5)
    at div
    at App
</div>

That's it! We can now start "forcing" devs to comply to our prop-types unless they want to have a noisy console. Note that components will still render, but with possible unexpected behavior. This makes it even more important to always have our dev tools open and making sure we take care of warnings. Let's explore some more options:
<br/>
<br/>

```jsx
MyComponent.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
  optionalObject: PropTypes.object,
};

MyComponent.propTypes = {
  optionalNode: PropTypes.node, // anything that can be rendered
  optionalElement: PropTypes.element, // specifically a react element
  optionalElementType: PropTypes.elementType, // a string which is the name of a native HTML element's type ('textearea', 'div') or the actual class {MyClass}
  optionalInstance: PropTypes.instanceOf(MyClass), // an instance of a specific component
};

// Allowing more than 1 type
MyComponent.propTypes = {
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Message)]),
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

// So far we haven't made anything required, just specified the type
// Any proptype can be made a required field
Avatar.propTypes = {
  requiredString: PropTypes.objectOf(PropTypes.string).isRequired,
  // Anything is allowed as long as its provided
  requiredAnything: PropTypes.any.isRequired,
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
```

## Client-Side Error Reporting

Ugh, unfortunately we got to the point were a bug slipped through and our application failed. So how does React handle a runtime error? Not gracefully unfortunately. If we are in development mode, it will display an overlay on our app with useful information for debugging and fixing the issue. In production, however, users will simply see a white screen, which is quite a frustrating experience as they are left thinking they made a mistake and have no clue on what to do next. To solve this problem, that is the experience but not the bug, React provides a simple solution yet slightly dated implementation called [Error Boundaries](https://reactjs.org/docs/error-boundaries.html). 

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Handle error, maybe send it to a logging service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

// Then we simply need to wrap our application (or single component) with it as:
const Wrapped = () => {
  return <ErrorBoundary>
    <App />
  </ErrorBoundary>;
}
```

As you can see, this implementation uses a `class` component which React has moved away from two major version ago. Further, this implementation has limitations that React explicitly mentions:

Error boundaries do not catch errors for:

- Event handlers (learn more)
- Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
- Server side rendering
- Errors thrown in the error boundary itself (rather than its children)

Because of this, we recommend using a third-party module called [`react-error-boundary`](https://www.npmjs.com/package/react-error-boundary). After installing it, we can use it as:

# TODO
react-error-boundary
Sentry

## Third Party Providers
Auth0
AWS Cognito

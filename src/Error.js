import { ErrorBoundary } from 'react-error-boundary';

function MyFallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const MyComponent = ({ name }) => {
  return (
    <div
      onClick={() => {
        console.log(name.test);
      }}
    >
      Hello
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary fallback={<div>Something Failed</div>} FallbackComponent={MyFallbackComponent}>
      <MyComponent />
    </ErrorBoundary>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const BlowUp = ({ name }) => {
  return <div>The length of name is {name.length}</div>;
};

const App = () => {
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setExplode(true);
    }, 1000);

    return () => clearTimeout(t);
  }, []);

  return (
    <ErrorBoundary fallback={<div>Something Failed</div>}>
      <div>
        Wait for it...
        {explode && <BlowUp />}
      </div>
    </ErrorBoundary>
  );
};

export default App;

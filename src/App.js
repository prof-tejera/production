import React, { memo, useState, useCallback } from 'react';

const Independent = ({ name, changeToggle }) => {
  console.log('Rendering Independent:', name);
  return (
    <div>
      <button onClick={changeToggle}>Toggle</button>
    </div>
  );
};

const WrappedIndependent = memo(Independent);

const App = () => {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  const increment = () => {
    setCount(c => c + 1);
  };

  const changeToggle = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  return (
    <div>
      <pre>{JSON.stringify({ count, toggle }, null, 2)}</pre>
      <button onClick={increment}>Increment</button>
      <Independent name="not using memo" changeToggle={changeToggle} />
      <WrappedIndependent name="using memo" changeToggle={changeToggle} />
    </div>
  );
};

export default App;

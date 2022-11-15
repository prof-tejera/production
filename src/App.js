import PropTypes from 'prop-types';

const SimpleButton = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

SimpleButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

const App = () => {
  return (
    <div>
      <SimpleButton
        label={1}
        onClick={() => {
          console.log('clicked 1');
        }}
      />
      <SimpleButton
        label="Test 2"
        onClick={() => {
          console.log('clicked 2');
        }}
      />
    </div>
  );
};

export default App;

import React from 'react';
import Terminal from './components/Terminal/Terminal';
import MacOSDesktop from './components/Desktop/MacOSDesktop';

function App() {
  return (
    <MacOSDesktop>
      <Terminal />
    </MacOSDesktop>
  );
}

export default App;

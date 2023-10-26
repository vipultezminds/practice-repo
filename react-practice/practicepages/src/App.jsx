import React, { useState } from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

function App() {
  const [activeComponent, setActiveComponent] = useState('login');

  return (
    <div className="App">
      <Login/>
      {/* <Signup/> */}
    </div>
  );
}

export default App;

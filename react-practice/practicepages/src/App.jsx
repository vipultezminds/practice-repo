import React, { useState } from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

function App() {
  const [activeComponent, setActiveComponent] = useState('login');

  const toggleComponent = () => {
    setActiveComponent(activeComponent === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="App">
      <Login/>
      {/* <Signup/> */}
    </div>
  );
}

export default App;

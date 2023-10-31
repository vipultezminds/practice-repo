// import React, { useState } from 'react';
// import { Login } from './components/Login';
// import { Signup } from './components/Signup';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import { useTheme } from "@mui/material"
// import { Dashboard } from './pages/Dashboard';
// import { ThemeProvider, createTheme } from '@mui/material/styles';



// function App() {
//   const [activeComponent, setActiveComponent] = useState('login');
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawer = (val) => {
//     setOpen(val);
//   };
//   const poppinstheme = createTheme({
//     typography: {
//       fontFamily: 'Poppins,sans-sarif',
//     },
//   });


//   return (
//     <ThemeProvider theme={poppinstheme}>
//       <div className="App">
//         <Login/>
//         <Signup/> 
//         <Navbar handleDrawer={handleDrawer} open={open} />
//         <Sidebar handleDrawer={handleDrawer} open={open} theme={theme} />

//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useTheme } from '@mui/material';
import { Dashboard } from './pages/Dashboard';
import { ThemeProvider, createTheme    } from '@mui/material/styles';

function App() {
  const [activeComponent, setActiveComponent] = useState('login');
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawer = (val) => {
    setOpen(val);
  };

  const poppinstheme = createTheme({
    typography: {   
      fontFamily: 'Poppins, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={poppinstheme}>
      <div className="App">
        <Router> 
          <Navbar handleDrawer={handleDrawer} open={open} />
          <Sidebar handleDrawer={handleDrawer} open={open} theme={theme} />
          <Routes>
            <Route path="/signup" element={<Signup/>} /> 
            {/* <Route path="/dashboard" element={<Dashboard/>} />  */}
            <Route path="/" element={<Login/>} /> 
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;


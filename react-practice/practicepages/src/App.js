import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Index';
import Sidebar from './components/Sidebar/Index';
import { useTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { commonTheme } from "./theme/index"

function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawer = (val) => {
    setOpen(val);
  };


  return (
    <ThemeProvider theme={commonTheme}>
      <div className="App">
        <Router>
          <Navbar handleDrawer={handleDrawer} open={open} />
          <Sidebar handleDrawer={handleDrawer} open={open} theme={theme} />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;


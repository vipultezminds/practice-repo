import React from 'react';
import { Button, Box } from '@mui/material';

const SalesButton = ({ activeButton, handleButtonClick, buttonLabels, buttonStyles }) => {
  return (
    <Box marginTop={2}>
      {buttonLabels.map((label, index) => (
        <Button
          key={index}
          onClick={() => handleButtonClick(label)}
          sx={{
            margin: '0 2px',
            height: '28px',
            textTransform: 'none',
            color: activeButton === label ? '#0064D9' : '#B3B8BD',
            backgroundColor: activeButton === label ? '#DEECFB' : 'white',
            '&:hover': {
              backgroundColor: activeButton === label ? '#DEECFB' : 'white',
            },
            boxShadow: 'none',
            ...buttonStyles, // Additional button-specific styles
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default SalesButton;

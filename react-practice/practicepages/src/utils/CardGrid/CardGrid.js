import React from 'react';
import { Grid, Paper, Stack, Typography } from '@mui/material';

const CardGrid = ({ cardData , cardStyle }) => {
  return (
    <Grid container spacing={2}>
      {cardData.map((data, index) => (
        <Grid item xs={4} key={index} paddingBottom={3}>
          <Paper sx={cardStyle}>
            <Stack margin={'auto 15px'}>
              {data.icon}
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  color: 'white',
                }}
              >
                {data.title}
              </Typography>
            </Stack>
            <Typography margin={'auto 15px'} fontWeight={'bold'} color={'white'} fontSize={30}>
              {data.count}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;

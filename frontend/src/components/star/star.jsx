
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating() {
  const [value, setValue] = React.useState(4);
  const scores = { 
    1: 'Useless', 
    2: 'Poor',  
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  }

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
       <Box sx={{ ml: 2 }}>{scores[value]}</Box>
    </Box>
  );
}


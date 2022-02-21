import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function ProgreesBar(props) {
  return (
    <Box sx={{ width: '50%' ,ml:40,mt:10 }}>
      <LinearProgress   variant="determinate" value={props.val} />
    </Box>
  );
}

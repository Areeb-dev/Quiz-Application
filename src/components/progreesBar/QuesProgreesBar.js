import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function QuesProgreesBar(props) {
  return (
    <Box sx={{ width: '50%', ml: 40, mt: 3 }}>
      <LinearProgress sx={{ height: 15, borderRadius: 5 }} variant="determinate" value={props.val} />
    </Box>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function ScoreProgreesBar(props) {
  return (
    <Box sx={{ width: '50%' ,mt:5,ml:40}}>
      {/* score is greater than 0 the show score value */}
      {props.val == 0 ? '' : <h1>{`Score:${props.val}%`}</h1>}
      <LinearProgress variant="determinate" value={props.val} />
    </Box>
  );
}

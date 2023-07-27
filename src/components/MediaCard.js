import * as React from 'react';
import { Grid, ButtonBase } from '@mui/material';

export default function MediaCard({ title, imgURL, countryCode, city, stateName }) {
  return (
      <Grid container direction="column" alignItems="center" className='bookBox hvr-grow-shadow'>
        <Grid item >
          <ButtonBase className='coverBox'>
            <img src={imgURL} alt='' />
          </ButtonBase>
        </Grid>
        <Grid item>
            {title}
        </Grid>
        <Grid item>
            {countryCode}, {city}, {stateName}
        </Grid>
      </Grid>
  );
}
import React from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress'

const Spinner = (props: CircularProgressProps): JSX.Element => {
  return (
    <Grid container justify='center'>
      <CircularProgress { ...props } />
    </Grid>
  )
}

export default Spinner

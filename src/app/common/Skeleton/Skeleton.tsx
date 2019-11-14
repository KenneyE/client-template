import React, { Fragment } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const Skel = (): JSX.Element => (
  <Fragment>
    <Skeleton variant='rect' height={ 80 } />
    <Skeleton />
    <Skeleton width='60%' />
  </Fragment>
)

export default Skel

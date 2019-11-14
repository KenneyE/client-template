import React from 'react'
import {
  createStyles,
  makeStyles,
  Theme,
  StyleRules,
} from '@material-ui/core/styles'
import Fab, { FabProps } from '@material-ui/core/Fab'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(
  (theme: Theme): StyleRules =>
    createStyles({
      buttonProgress: {
        color: theme.palette.secondary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
    })
)
export interface Props extends FabProps {
  loading: boolean;
}

const LoadingFab = ({
  loading,
  disabled,
  children,
  ...props
}: Props): JSX.Element => {
  const classes = useStyles()

  return (
    <Fab { ...props } disabled={ loading || disabled }>
      {children}
      {loading && (
        <CircularProgress size={ 24 } className={ classes.buttonProgress } />
      )}
    </Fab>
  )
}

LoadingFab.displayName = 'LoadingFab'

export default LoadingFab

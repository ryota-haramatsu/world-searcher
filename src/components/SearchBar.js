import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 20,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  root: {
    marginTop: 150,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: "#FFFFE0",
    padding:50
  }
}));

export default useStyles
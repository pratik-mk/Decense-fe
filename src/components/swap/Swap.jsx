import {
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  Divider,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";

import CoinField from "./CoinField";

const styles = (theme) => ({
  paperContainer: {
    //temp
    marginTop: "50px",
    borderRadius: "16px",
    padding: "8px",
    paddingBottom: "24px",
  },
  switchButton: {
    zIndex: 1,
    margin: "-16px",
    padding: "4px",
  },
  fullWidth: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    padding: "4px",
    marginBottom: "8px",
  },
  hr: {
    width: "100%",
  },
  balance: {
    padding: "8px",
    overflow: "wrap",
    textAlign: "center",
  },
});

const useStyles = makeStyles(styles);

const Swap = ({ title }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <Paper className={classes.paperContainer}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item xs={12} className={classes.fullWidth}>
            <CoinField />
          </Grid>
          <IconButton
            onClick={() => console.log("ICON BUTTON CLICK")}
            className={classes.switchButton}
          >
            <SwapVerticalCircleIcon fontSize="medium" />
          </IconButton>
          <Grid item xs={12} className={classes.fullWidth}>
            <CoinField />
          </Grid>
          <hr className={classes.hr} />

          {/* Balance Display */}
          <Typography variant="h6">Your Balances</Typography>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={6}>
              <Typography variant="body1" className={classes.balance}>
                0.0
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" className={classes.balance}>
                0.0
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Swap;

import { Grid, Fab, InputBase } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import * as COLORS from "@material-ui/core/colors";

import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";
const useStyles = makeStyles((theme) => ({
  container: {
    padding: "8px",
    minHeight: "80px",
    backgroundColor: grey[50],
    borderRadius: "16px",
    borderColor: grey[300],
    borderWidth: "1px",
    borderStyle: "solid",
  },
  container_blank: {
    padding: 1,
    minHeight: "80px",
    borderRadius: 2,
  },
  grid: {
    height: "60px",
  },
  fab: {
    zIndex: "0",
  },
  input: {
    width: "100%",
  },
  inputBase: {
    // fontWeight: "bold",
    fontSize: "1.5rem",
    textAlign: "right",
  },
}));

const CoinField = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={classes.grid}
      >
        {/* Button */}
        <Grid item xs={3}>
          <Fab
            size="small"
            variant="extended"
            onClick={() => console.log("FAB CLICK")}
            className={classes.fab}
          >
            TOKEN
            <ExpandMoreIcon />
          </Fab>
        </Grid>

        {/* Text Field */}
        <Grid item xs={9}>
          <InputBase
            // onChange={() => console.log("ONCHANGE INPUTBASE")}
            placeholder="0.0"
            classes={{ root: classes.input, input: classes.inputBase }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CoinField;

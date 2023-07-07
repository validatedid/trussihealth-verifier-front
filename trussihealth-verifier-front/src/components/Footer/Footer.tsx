import { Grid } from "@mui/material";
import "./Footer.css";

function Footer() {
  return (
    <Grid container className="footer">
      <Grid item lg={3} xs={8} sm={8} className="rightSide">
        <img
          className="logoFooter"
          src={require("../../assets/images/logoOnly.png")}
          alt="City"
        />
        <text className="textFooter">Copyright © 2023 Validated ID, SL</text>
      </Grid>
      <Grid item lg={2.5} xs={1} sm={1}></Grid>
      <Grid item lg={2} xs={1} sm={1} className="leftSide"></Grid>
    </Grid>
  );
}

export default Footer;

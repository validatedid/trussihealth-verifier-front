import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { SwitchLanguage } from "../SwitchLanguage/SwitchLanguage";
import "./Header.css";

function Header() {
  return (
    <Grid container className="headerBackground">
      <Grid item flex={5}>
        <Link to={"/"}>
          <img
            className="logoHeader"
            src={require("../../assets/images/logotruss.jpg")}
            alt="Logo"
          />
        </Link>
      </Grid>
      <Grid item flex={1} className="sloganHeader">
        <p>Always be yourself</p>
      </Grid>
      <Grid item flex={0.5} className="languageSelector">
        <SwitchLanguage />
      </Grid>
    </Grid>
  );
}

export default Header;

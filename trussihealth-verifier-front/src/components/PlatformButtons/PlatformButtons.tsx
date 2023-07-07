import { Grid, Link } from "@mui/material";
import { I18n } from "../../i18n/i18n";
import "./PlatformButtons.css";

function PlatformButtons() {
  return (
    <Grid container className="platformsButtons">
      <Grid item className="buttonStyle apple">
        <img
          className="icon"
          src={require("../../assets/images/appleIcon.png")}
          alt="app store"
        />
        <Link
          href="https://apps.apple.com/es/app/vidwallet/id1554340592"
          color={"inherit"}
          target={"_blank"}
          underline="none"
        >
          <div className="downloadTitle">{I18n.t("global.download")}</div>
          <div className="companyName">Apple App Store</div>
        </Link>
      </Grid>
      <Grid item className="divisor" />
      <Grid item className="buttonStyle playstore">
        <img
          className="icon"
          src={require("../../assets/images/playstoreIcon.png")}
          alt="play store"
        />
        <Link
          href="https://play.google.com/store/apps/details?id=com.validatedid.wallet"
          target={"_blank"}
          color={"inherit"}
          underline="none"
        >
          <div className="downloadTitle">{I18n.t("global.download")}</div>
          <div className="companyName">Google Play Store</div>
        </Link>
      </Grid>
    </Grid>
  );
}

export default PlatformButtons;

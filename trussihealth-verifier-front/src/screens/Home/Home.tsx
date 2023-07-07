import { Grid } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import LoginButton from "../../components/LoginButton/LoginButton";
import PlatformButtons from "../../components/PlatformButtons/PlatformButtons";
import { I18n } from "../../i18n/i18n";
import { OpenIDClient } from "../../libs/openid/client";
import "./Home.css";

function Home() {
  const signInWithVIDchain = async () => {
    const client = OpenIDClient.getInstance().getProvider();
    client.wipeTokens();
    await client.callback();
    await client.getToken({
      scopes: {
        request: ["openid", "HealthDataCredential"],
      },
    });
  };

  return (
    <div className="container">
      <Header />
      <Grid container className="centerContainer">
        <Grid item className="centerWrap">
          <text className="byText">{I18n.t("global.by")}</text>
          <text className="title">{I18n.t("global.mainTitle")}</text>
          <text className="subtitle">{I18n.t("global.subtitleAccess")}</text>
          <LoginButton vidchainLogin={signInWithVIDchain} />
        </Grid>
        <img
          className="centerImage"
          src={require("../../assets/images/mainBackground.png")}
          alt="background"
        />
        <PlatformButtons />
      </Grid>
      <Footer />
    </div>
  );
}

export default Home;

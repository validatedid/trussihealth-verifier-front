import { Box, Grid, LinearProgress, Tab, Tabs } from "@mui/material";
import { I18n } from "../../i18n/i18n";
import { useEffect, useState } from "react";
import DownloadButton from "../../components/DownloadButton/DownloadButton";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import TabPanel from "../../components/TabPanel/TabPanel";
import { authLogin } from "../../services/vidcredentials";
import CredentialPanel from "../Credentials/CredentialPanel";
import IssuerPanel from "../Credentials/IssuerPanel";
import SubjectPanel from "../Credentials/SubjectPanel";
import HealthPanel from "../Credentials/HealthPanel";
import "./Callback.css";

function Callback() {
  const [value, setValue] = useState(0);
  const [credentialData, setCredentialData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const code = new URLSearchParams(window.location.search).get("code");
  useEffect(() => {
    if (Object.keys(credentialData).length > 0) setLoading(false);
  }, [credentialData]);

  useEffect(() => {
    if (!code) {
      console.log("Error in the login process");
      return;
    }
    const currentCode = localStorage.getItem("code");
    if (currentCode != code) {
      const login = async () => {
        try {
          const sessionToken = await authLogin(code);
          if ("error" in sessionToken) {
            return;
          }
          localStorage.setItem("code", code);
          localStorage.setItem("tab", "0");
          const credentialInfo = sessionToken.verifiableCredential;
          localStorage.setItem("session", JSON.stringify(credentialInfo));
          setCredentialData(credentialInfo);
        } catch (error) {
          console.log(error);
          console.log("Error unable to login");
          return;
        }
      };
      login();
    } else {
      const oldSession = localStorage.getItem("session");
      const cachedTab = localStorage.getItem("tab");
      if (oldSession) setCredentialData(JSON.parse(oldSession));
      setValue(cachedTab ? parseInt(cachedTab) : 0);
    }
  }, [code]);

  const indexProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    localStorage.setItem("tab", newValue.toString());
  };

  const handleDownload = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(credentialData)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  return (
    <div className="container">
      <Header />
      <Grid container spacing={1} className="centerContainer">
        {loading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          <Grid item className="mainTitleWrap">
            <Grid item>
              <h1>{I18n.t("global.credentialTitle")}</h1>
            </Grid>
            <Grid container className="mainWrap">
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <img
                  className="centerCardImage"
                  src={require("../../assets/images/mockCard.png")}
                  alt="background"
                />
                <Grid item className="downloadButtonContainer">
                  <DownloadButton
                    downloadEvent={handleDownload}
                    title={I18n.t("global.downloadLabel")}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                lg={8}
                sx={{ paddingLeft: "2%" }}
              >
                <Grid item sx={{ px: 3 }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="credential verification"
                  >
                    <Tab
                      label={I18n.t("global.credentialLabel")}
                      {...indexProps(0)}
                    />
                    <Tab
                      label={I18n.t("global.issuerLabel")}
                      {...indexProps(1)}
                    />
                    <Tab
                      label={I18n.t("global.subjectLabel")}
                      {...indexProps(2)}
                    />
                    <Tab
                        label={I18n.t("global.healthLabel")}
                        {...indexProps(3)}
                    />
                  </Tabs>
                </Grid>
                <TabPanel value={value} index={0}>
                  <CredentialPanel index={0} verifiableCredential={credentialData} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <IssuerPanel index={1} verifiableCredential={credentialData} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <SubjectPanel index={2} verifiableCredential={credentialData} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <HealthPanel index={3} verifiableCredential={credentialData} />
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Footer />
    </div>
  );
}

export default Callback;

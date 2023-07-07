import { useEffect, useState } from "react";
import { Box, Grid, LinearProgress } from "@mui/material";
import { validateEidasSeal } from "../../services/vidcredentials";
import "./Panels.css";
import { I18n } from "../../i18n/i18n";
import { camelCaseToWords, parseBase64 } from "../../utils/utils";
import DownloadButton from "../../components/DownloadButton/DownloadButton";

interface Props {
  index: number;
  verifiableCredential: any;
}

function IssuerPanel(props: Props) {
  const cachedIssuerDid = localStorage.getItem("issuerDid");
  const [eidasValidation, setEidasValidation] = useState<any>({});

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    type: [],
    issuanceDate: "",
    expirationDate: "",
  });

  const { verifiableCredential } = props;
  const { issuanceDate, type, issuer } =
    verifiableCredential;

  useEffect(() => {
    if (data.type.length === 0) {
      setData({ type, issuanceDate, expirationDate: "" });
    }

    const validateCredential = async () => {
      try {
        const response = await validateEidasSeal(verifiableCredential);
        if ("error" in response) {
          return;
        }
        setEidasValidation(response);
        localStorage.setItem("eidas", JSON.stringify(response));
        const issuerDid = typeof issuer === "string" ? issuer : issuer.id;
        localStorage.setItem("issuerDid", issuerDid);
        setLoading(false);
      } catch (error) {
        console.log("Error unable to validate");
        return;
      }
    };

    if (cachedIssuerDid != (typeof issuer === "string" ? issuer : issuer.id)) {
      validateCredential();
    } else {
      const cachedEidas = localStorage.getItem("eidas");
      const eidasJson = cachedEidas ? JSON.parse(cachedEidas) : new Object();
      setEidasValidation(eidasJson);
      setLoading(false);
    }
  }, []);

  const formatDate = (date: string | undefined): string => {
    if (!date) {
      return "N/A";
    }
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString();
  };

  const isDate = (dateData: any): boolean => {
    const date = new Date(dateData);
    return date instanceof Date && !Number.isNaN(date.getTime());
  };

  const displayPayload = (payload: any) => {
    return (
      payload &&
      Object.keys(payload).map((key) => (
        <Grid item sm={12} xs={12} md={12} lg={12} className="fieldContainer">
          <text>{camelCaseToWords(key)}:</text>
          <text>
            {isDate(payload[key]) ? formatDate(payload[key]) : payload[key]}
          </text>
        </Grid>
      ))
    );
  };

  const handleDownload = () => {
    const stringData = `data:text/plain;chatset=utf-8,${encodeURIComponent(
      parseBase64(eidasValidation.cert)
    )}`;
    const link = document.createElement("a");
    link.href = stringData;
    link.download = "certificate.cer";

    link.click();
  };

  return (
    <div>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Grid container className="panelContainer">
          {typeof issuer === "string" ? null : (
            <Grid
              item
              sm={12}
              xs={12}
              md={12}
              lg={12}
              className="fieldContainer"
            >
              <text>{I18n.t("credential.name")}:</text>
              <text>{issuer.name}</text>
            </Grid>
          )}
          <Grid item sm={12} xs={12} md={12} lg={12} className="fieldContainer">
            <text>{I18n.t("credential.id")}:</text>
            <text>{typeof issuer === "string" ? issuer : issuer.id}</text>
          </Grid>
          <Grid item sm={12} xs={12} md={12} lg={12} className="fieldContainer">
            <text>{I18n.t("credential.eidas")}:</text>
            <text>
              {eidasValidation.eidasCertInside
                ? I18n.t("credential.valid")
                : "No"}
            </text>
          </Grid>
          {eidasValidation.eidasCertInside && (
            <Grid
              item
              sm={12}
              xs={12}
              md={12}
              lg={12}
              className="fieldContainer"
            >
              <text className="titleIssuerSection">
                {I18n.t("credential.eidas")}:
              </text>
              {displayPayload(eidasValidation.certInfo)}
              <Grid
                item
                sm={12}
                xs={12}
                md={12}
                lg={12}
                className="fieldContainer"
              >
                <text>{I18n.t("credential.eidasValidation")}:</text>
                <text>
                  {eidasValidation.valid ? I18n.t("credential.yes") : "No"}
                </text>
              </Grid>
              <DownloadButton
                downloadEvent={handleDownload}
                title={I18n.t("global.downloadEidas")}
              />
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
}

export default IssuerPanel;

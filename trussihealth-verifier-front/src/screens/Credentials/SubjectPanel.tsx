import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { I18n } from "../../i18n/i18n";
import { camelCaseToWords } from "../../utils/utils";
import "./Panels.css";

interface Props {
  index: number;
  verifiableCredential: any;
}

function SubjectPanel(props: Props) {
  const [data, setData] = useState({});
  const { verifiableCredential } = props;
  const { credentialSubject } = verifiableCredential;

  const formatDate = (date: string | undefined): string => {
    if (!date) {
      return I18n.t("table.notAvailable");
    }
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString();
  };

  const isIsoDate = (str: any): boolean => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    const date = new Date(str);
    return (
      date instanceof Date && !Number.isNaN(date) && date.toISOString() === str
    );
  };

  useEffect(() => {
    setData(credentialSubject);
  }, [verifiableCredential]);

  const displayPayload = (payload: any) => {
    return (
      payload &&
      Object.keys(payload).map((key) => (
        <Grid item sm={12} xs={12} md={12} lg={12} className="fieldContainer">
          <text>{camelCaseToWords(key)}:</text>
          <text>
            {isIsoDate(payload[key]) ? (
              formatDate(payload[key])
            ) : typeof payload[key] != "string" ? (
              key === "image" ? (
                <img
                  style={{ height: "7rem", width: "7rem" }}
                  src={payload[key].id}
                />
              ) : (
                displayPayload(payload[key])
              )
            ) : (
              payload[key].toString()
            )}
          </text>
        </Grid>
      ))
    );
  };


  return (
    <Grid container className="panelContainer">
      {displayPayload(data)}
    </Grid>
  );
}

export default SubjectPanel;

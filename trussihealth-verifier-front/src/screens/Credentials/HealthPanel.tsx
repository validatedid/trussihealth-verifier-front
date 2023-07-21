import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { I18n } from "../../i18n/i18n";
import { getHealthData } from "../../services/vidcredentials";
import "./Panels.css";

interface Props {
    index: number;
    verifiableCredential: any;
}

function HealthPanel(props: Props) {
    let patient;
    const [parsed, setParsed] = useState("");
    const [data, setData] = useState({
        patient: {reference: ""},
        note: {text: ""},
        recordedDate: "",
        onsetDateTime: ""
    });
    const [allData, setAllData] = useState();
    const [isData, setIsData] = useState(false);
    const { verifiableCredential } = props;
    const { issuanceDate, type } = verifiableCredential;


    useEffect(() => {
        if (!isData)
            getData();
    }, []);

    const getData = async () => {
        const documentId = verifiableCredential.credentialSubject.documentId;
        if (documentId) {
            const userData = await getHealthData(documentId);
            if (userData.base64data){
                const jsonData = JSON.parse(userData.base64data);

                setIsData(true);
                setData(jsonData);
                setAllData(jsonData);

            }else{
                setIsData(false);
            }


        } else {
            setIsData(false);
        }
    };
    const formatDate = (date: string) => {
        if (!date) {
            return I18n.t("global.notAvailable");
        }
        const formattedDate = new Date(date);
        return formattedDate.toLocaleString();
    };


    function renderWithKeys(item: any, level: number) {
       let mLevel = level + 1;

        return Object.keys(item).map((key) => (
            <div style={{marginLeft: mLevel * 6}}><strong style={{ textTransform: "capitalize"}} >{ key + ": "}</strong>
                {typeof item[key] === "object"
                    ? renderWithKeys(item[key],mLevel)
                    : item[key]}
            </div>
        ));
    }

    return (
        <Grid container className="mainPanelContainer">
            <Grid item xs={12} sm={12} md={12} lg={12} className="fieldContainer">
                <text>{I18n.t("health.patient")}:</text>
                <text>{ data.patient.reference }</text>

            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} className="fieldContainer">
                <text>{I18n.t("health.data")}:</text>

                <text>

                    {allData &&
                        Object.keys(allData).map((key) => (
                            <div><strong style={{ textTransform: "capitalize", marginTop: 6}}>{"" + key + ": "}</strong>
                                {typeof allData[key] === "object"
                                    ? renderWithKeys(allData[key],1)
                                    : allData[key]}
                            </div>
                        ))
                    }

                </text>
            </Grid>



        </Grid>
    );
}

export default HealthPanel;

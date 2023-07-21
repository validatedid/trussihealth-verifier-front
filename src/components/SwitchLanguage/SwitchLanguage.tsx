import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { changeLanguage, I18n } from "../../i18n/i18n";
import "./SwitchLanguage.css";

export const SwitchLanguage = () => {
  const [language, setLanguage] = useState(I18n.defaultLocale);

  const changeSelection = (e: any) => {
    changeLanguage(e.target.value);
    setLanguage(e.target.value);
  };

  return (
    <Select
      size="small"
      value={language}
      onChange={(e) => changeSelection(e)}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
    >
      <MenuItem value={"en"}>EN</MenuItem>
      <MenuItem value={"es"}>ES</MenuItem>
    </Select>
  );
};

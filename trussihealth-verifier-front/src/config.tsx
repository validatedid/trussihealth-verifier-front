const OPENID = {
  CLIENT_ID: process.env.REACT_APP_OPENID_CLIENT_ID,
  IDENTITY_PROVIDER: process.env.REACT_APP_IDENTITY_PROVIDER,
  REDIRECT_CALLBACK_LOGIN: process.env.REACT_APP_REDIRECT_CALLBACK_LOGIN,
  OPEN_CLIENT_ID_SECRET: process.env.REACT_APP_OPENID_CLIENT_SECRET,
};

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;
const BACKEND_ENDPOINTS = {
  AUTHORIZE: `${BACKEND_BASE_URL}/authorize`,
  VALIDATE: `${BACKEND_BASE_URL}/validate`,
  REVOKED: `${BACKEND_BASE_URL}/revoked`,
};
const BACKEND ={
    BASE_URL: BACKEND_BASE_URL,
    ENDPOINTS: BACKEND_ENDPOINTS
}
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile entity";

const DID = "0xF996fc66a524eF766a15d9dae8dDD3A4Eb7796CB";

const eidasCertificatePassword = "1234";

export { grantType, scope, DID, eidasCertificatePassword, OPENID,BACKEND };

import * as dotenv from 'dotenv';

dotenv.config();

const checkStrVar = (variable: string | undefined, name: string): string => {
  if (!variable) throw new Error(`undefined variable: ${name}`);
  return variable;
};

const PORT = checkStrVar(process.env.PORT, 'PORT');
const FRONTEND_BASE_URL = checkStrVar(
  process.env.FRONTEND_BASE_URL,
  'FRONTEND_BASE_URL',
);

const BASE_PATH = checkStrVar(process.env.BASE_PATH, 'BASE_PATH');

const BASIC_AUTH = process.env.OPENID_BASIC_AUTH;

const BACKEND_PATHS = {
  AUTHORIZE: '/authorize',
  VALIDATE: '/validate',
  REVOKED: '/revoked/statusList/:statusListId/credentialId/:credentialId',
  HEALTH: '/health-data/:documentId',
};
const SERVICE = {
  PORT,
  BASE_PATH,
  BACKEND_PATHS,
  FRONTEND_BASE_URL,
};

const OPENID = {
  URL: checkStrVar(process.env.OPENID_URL, 'OPENID_URL'),
  CLIENT_SECRET: checkStrVar(
    process.env.OPENID_CLIENT_SECRET,
    'OPENID_CLIENT_SECRET',
  ),
  CLIENT_ID: checkStrVar(process.env.OPENID_CLIENT_ID, 'OPENID_CLIENT_ID'),
};

const VIDCHAIN = {
  URL: checkStrVar(process.env.VIDCHAIN_URL, 'VIDCHAIN_URL'),
  API_KEY: checkStrVar(process.env.VIDCHAIN_API_KEY, 'VIDCHAIN_API_KEY'),
  ISS: checkStrVar(process.env.VIDCHAIN_ISS, 'VIDCHAIN_ISS'),
};

export { SERVICE, OPENID, VIDCHAIN, BASIC_AUTH };

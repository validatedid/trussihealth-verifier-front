# TRUSSIHEALTH VERIFIER FRONTEND

This repository contains the frontend for TruSSIHealth Verifier. It is developed with React.
Follow the instructions belows to run it locally.

## Install

```bash
$ npm install
```

## Prepare env variables

Create `.env` file in the root directory and set the values:
```
REACT_APP_IDENTITY_PROVIDER=https://labs.vidchain.net
REACT_APP_DEMO=http://localhost:3000
PUBLIC_URL=http://localhost:3000
REACT_APP_BACKEND_URL=http://localhost:3050/trussihealth-verifier
REACT_APP_REDIRECT_CALLBACK_LOGIN=http://localhost:3000/callback
REACT_APP_OPENID_CLIENT_ID=cemtro-trussihealth
GENERATE_SOURCEMAP=false
```

## Run the app
```bash
$ npm run start
```

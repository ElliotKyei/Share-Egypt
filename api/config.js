'use strict'
const path = require('path');
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const {
  PORT,
  HOST,
  HOST_URL,
  PROJECT_ID,
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
  CLIENT_ID,
  SERVICE_ACCOUNT_EMAIL,
} = process.env

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  serviceAccountKey: {
    "type": "service_account",
    "project_id": PROJECT_ID,
    "private_key_id": PRIVATE_KEY_ID,
    "private_key": PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": CLIENT_EMAIL,
    "client_id": CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/" + SERVICE_ACCOUNT_EMAIL
  }

}
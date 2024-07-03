# ShareEgypt

A charity listing platform for Egypt.

![ShareEgypt SS-1](https://github.com/ElliotKyei/Share-Egypt/assets/73500548/b2c65833-0080-4427-a69a-f443eecca697)

![ShareEgypt SS-2](https://github.com/ElliotKyei/Share-Egypt/assets/73500548/222012fb-3022-450a-857c-275c98e983de)


---

## Start express server locally
1. If haven't already, set up a new service account key in Google Cloud Platform. Save the key details somewhere locally. 
2. Head to the express server directory `cd api`
3. In the `api` directory, `npm install`, to get all the needed dependencies
4. Copy the `env.template` to a new `.env` file in the `api` directory
5. Fill in the new `.env` file. The configs generally follow this template in the GCP docs
```text
{
  "type": "service_account",
  "project_id": "project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nprivate-key\n-----END PRIVATE KEY-----\n",
  "client_email": "service-account-email",
  "client_id": "client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/service-account-email"
}
```
**Please note** the `PRIVATE_KEY` config includes the whole `"private_key"` line, including the `-----BEGIN PRIVATE KEY-----\n` and `\n-----END PRIVATE KEY-----\n`

6. Once the `.env` file is filled in. Start the server locally with `npm start`. Be sure to be in the `api` directory.

const path = require('path');
const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    // APP
    APP_NAME: Joi.string().required(),
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    BASE_URL: Joi.string().required(),
    // DATABASE
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().allow(null, ''),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_NAME: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  name: envVars.APP_NAME,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  baseUrl: envVars.BASE_URL,
  baseApiUrl: envVars.BASE_API_URL,
  baseAdminUrl: envVars.BASE_ADMIN_URL,
  jwtSecretKey: envVars.JWT_SECRET_KEY,
  database: {
    user: envVars.DATABASE_USER,
    password: envVars.DATABASE_PASSWORD,
    host: envVars.DATABASE_HOST,
    port: envVars.DATABASE_PORT,
    name: envVars.DATABASE_NAME,
  },
  agora: {
    appId: envVars.AGORA_APP_ID,
    appCert: envVars.AGORA_APP_CERTIFICATE,
  },
  firebase: {
    type: envVars.FIREBASE_TYPE,
    projectId: envVars.FIREBASE_PROJECT_ID,
    privateKeyId: envVars.FIREBASE_PRIVATE_KEY_ID,
    privateKey: envVars.FIREBASE_PRIVATE_KEY,
    clientEmail: envVars.FIREBASE_CLIENT_EMAIL,
    clientId: envVars.FIREBASE_CLIENT_ID,
    authUri: envVars.FIREBASE_AUTH_URI,
    tokenUri: envVars.FIREBASE_TOKEN_URI,
    authProviderX509CertlUrl: envVars.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: envVars.FIREBASE_CLIENT_X509_CERT_URL,
  },
  s3: {
    name: envVars.SPACE_NAME,
    key: envVars.SPACE_KEY,
    secret: envVars.SPACE_SECRET,
    endpoint: envVars.SPACE_ENDPOINT,
    rootDir: envVars.SPACE_ROOT_DIR,
  },
};

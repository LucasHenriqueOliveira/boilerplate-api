export const constants = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    mongo_url: process.env.MONGO_URL,
    mongo_database: process.env.MONGO_DATABASE,
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    secret_refresh: process.env.JWT_REFRESH_TOKEN_SECRET,
    expiresRefreshIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    two_factor_authentication_app_name: process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME
};
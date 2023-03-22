export const configurator = () => ({
  app: {
    production: process.env.NODE_ENV === 'production',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || '@rGo5epFuwsn9wf#glJtDo7qk2NwLtBV',
    jwtExpiresIn: +process.env.JWT_EXPIRES_IN || 7200,
    jwtRtExpiresIn: +process.env.JWT_RT_EXPIRES_IN_MS || 2592000 * 1000,
    forbiddenResendTtl: +process.env.EMAIL_FORBIDDEN_TIME || 60 * 1000,
  },
  postgres: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

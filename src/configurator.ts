export const configurator = () => ({
  app: {
    production: process.env.NODE_ENV === 'production',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || '@rGo5epFuwsn9wf#glJtDo7qk2NwLtBV',
  },
  postgres: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

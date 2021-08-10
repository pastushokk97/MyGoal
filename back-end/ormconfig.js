module.exports = {
  type: 'postgres',
  host: process.env.NODE_ENV === 'test' ? process.env.DB_HOST_LOCALHOST : process.env.DB_HOST_PROD,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.NODE_ENV === 'test' ? process.env.DB_PASSWORD_LOCALHOST : process.env.DB_PASSWORD_PROD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  schema: 'public',
  entities: [
    'dist/**/*.entity{.js,.ts}'
  ],
  migrations: [
    'dist/db/migration/*.js'
  ],
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/db/migration'
  }
}
module.exports = {
  type: 'postgres',
  host:  process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  schema: 'public',
  entities: [
    'dist/**/*.entity{.js,.ts}'
  ],
  migrations: [
    'dist/src/db/migration/*.js'
  ],
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/db/migration'
  }
};
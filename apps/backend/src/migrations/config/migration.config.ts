const mongoUri = process.env['MONGO_DB_URI'];
const mongoHost = process.env.ENV === process.env['MONGO_HOST'];
const mongoDatabase = process.env['MONGO_DB'];
const mongoUser = process.env['MONGO_USER'];
const mongoUserPassword = process.env['MONGO_PASS'];
const uri = `${mongoUri}://${mongoUser}:${mongoUserPassword}@${mongoHost}/${mongoDatabase}`;
const migrationsPath = './migrations';

export default {
  uri,
  collection: 'lead-intake-funnel-migrations',
  migrationsPath,
  templatePath: './migration-utils/template/migration.template.ts',
  autosync: true,
};
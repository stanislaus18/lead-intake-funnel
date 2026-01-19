const mongoUri = process.env['MONGO_DB_URI'] || 'mongodb';
const mongoHost = process.env['MONGO_HOST'] || 'localhost:27017';
const mongoDatabase = process.env['MONGO_DB'] || 'lead_intake_funnel';
const mongoUser = process.env['MONGO_USER'] || 'root';
const mongoUserPassword = process.env['MONGO_PASS'] || 'root';
const uri = `${mongoUri}://${mongoUser}:${mongoUserPassword}@${mongoHost}/${mongoDatabase}?authSource=admin`;
const migrationsPath = './migrations';

export default {
  uri,
  collection: 'lead-intake-funnel-migrations',
  migrationsPath,
  templatePath: './apps/backend/src/migrations/template/migration.template.ts',
  autosync: true,
};
import mongoose from 'mongoose';

import migrationsConfig from '../config/migration.config';

export const getMongooseInstance = async (): Promise<typeof mongoose> => {
  const uri = migrationsConfig.uri;
  try {
    await mongoose.connect(uri);
    console.log(`Successfully connected to Database.`);
    return mongoose;
  } catch (error) {
    console.error(`Failed connection to the database.`);
    console.error(`Connection Error: ${error.message}`);
    throw error;
  }
};
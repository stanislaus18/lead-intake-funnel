import { CreateCollectionOptions, IndexSpecification } from 'mongodb';
import { Connection } from 'mongoose';

import { collectionExistsInDatabase } from './collection-exists-database.helper';

export const createCollectionIfNotExists = async (
  connection: Connection,
  collectionName: string,
  createCollectionOptions: CreateCollectionOptions,
  createIndex: boolean,
  indexSpec?: IndexSpecification,
): Promise<boolean> => {
  if (await collectionExistsInDatabase(connection, collectionName)) {
    console.log(
      `Collection ${collectionName} already exists in Database. No changes will be done.`,
    );
    return false;
  }
  try {
    await connection.createCollection(collectionName, {
      validator: createCollectionOptions.validator,
    });
    console.log(`Collection ${collectionName} created.`);
    if (createIndex && indexSpec) {
      await connection.collection(collectionName).createIndex(indexSpec);
      console.log(`Index for ${collectionName} created.`);
    }
    return true;
  } catch (error) {
    throw new Error(error?.message ?? `Failed to create collection ${collectionName}.`);
  }
};
import { CreateCollectionOptions, IndexSpecification } from 'mongodb';
import { Connection } from 'mongoose';

import { collectionExistsInDatabase } from './collection-exists-database.helper';

export const updateCollectionIfExists = async (
  connection: Connection,
  collectionName: string,
  updateCollectionOptions: CreateCollectionOptions,
  updateIndex: boolean,
  indexSpec?: IndexSpecification,
): Promise<boolean> => {
  if (!(await collectionExistsInDatabase(connection, collectionName))) {
    console.log(
      `Collection ${collectionName} does not exist in the database. No updates will be made.`,
    );
    return false;
  }
  try {
    await connection.db.command({
      collMod: collectionName,
      validator: updateCollectionOptions.validator,
    });
    console.log(`Validator for collection ${collectionName} updated successfully.`);

    // Update the index if specified
    if (updateIndex && indexSpec) {
      await connection.collection(collectionName).createIndex(indexSpec);
      console.log(`Index for ${collectionName} updated successfully.`);
    }
    return true;
  } catch (error) {
    throw new Error(error?.message ?? `Failed to update collection ${collectionName}.`);
  }
};
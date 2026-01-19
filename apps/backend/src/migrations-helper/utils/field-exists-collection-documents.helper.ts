import { Connection } from 'mongoose';

export const fieldExistsInCollectionDocuments = async (
  connection: Connection,
  collectionName: string,
  fieldName: string,
): Promise<boolean> => {
  const collectionInfo = await connection.db
    .listCollections({ name: collectionName })
    .toArray();

  if (collectionInfo.length === 0) {
    return false;
  }

  const documentWithPersonAttribute = await connection
    .collection(collectionName)
    .findOne({ [fieldName]: { $exists: true } }, { projection: { _id: 1 } });

  return documentWithPersonAttribute !== null;
};
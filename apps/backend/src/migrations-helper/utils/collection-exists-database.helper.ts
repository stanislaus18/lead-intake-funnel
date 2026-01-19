import { Connection } from 'mongoose';

export const collectionExistsInDatabase = async (
  connection: Connection,
  collectionName: string,
) => {
  const collections = await connection.db.listCollections({ name: collectionName }).toArray();
  return collections.length > 0;
};
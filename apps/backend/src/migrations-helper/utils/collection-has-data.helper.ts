import { Connection } from 'mongoose';

export const collectionHasData = async (connection: Connection, collectionName: string) => {
  const count = await connection.collection(collectionName).countDocuments();
  return count > 0;
};
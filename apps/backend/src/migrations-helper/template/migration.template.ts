import { getMongooseInstance } from '../utils/get-mongoose-instance.helper';

export async function up(): Promise<void> {
  const mongoose = await getMongooseInstance();
  // Write your UP script here
}

export async function down(): Promise<void> {
  const mongoose = await getMongooseInstance();
  // Write your DOWN script here
}
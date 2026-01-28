import { MongoClient } from 'mongodb';

const MARKETING_COLLECTION = 'marketing';
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb://root:root@localhost:27017/lead_intake_funnel?authSource=admin';

let mongoClient: MongoClient;

async function getDB() {
  if (!mongoClient) {
    mongoClient = new MongoClient(MONGO_URI);
    await mongoClient.connect();
  }
  return mongoClient.db('lead_intake_funnel');
}

export async function up(): Promise<void> {
  try {
    const db = await getDB();
    console.log(`Started migrating create-marketing-collection`);

    const marketingSchema = {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'Marketing Object Validation',
          required: ['id', 'createdAt'],
          properties: {
            id: {
              bsonType: 'string',
              description: "'id' must be a string and is required",
            },
            customerLoyaltyProgramType: {
              bsonType: 'string',
              description:
                "'customerLoyaltyProgramType' must be a string (e.g., 'Friends of Vamo')",
            },
            customerLoyaltyProgramId: {
              bsonType: 'string',
              description: "'customerLoyaltyProgramId' must be a string",
            },
            createdAt: {
              bsonType: 'date',
              description: "'createdAt' must be a date",
            },
            updatedAt: {
              bsonType: 'date',
              description: "'updatedAt' must be a date",
            },
          },
        },
      },
    };

    // Check if collection exists
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(
      (c) => c.name === MARKETING_COLLECTION,
    );

    if (!collectionExists) {
      await db.createCollection(MARKETING_COLLECTION, marketingSchema);
      console.log(
        `Collection and Validation for ${MARKETING_COLLECTION} successfully created.`,
      );

      const collection = db.collection(MARKETING_COLLECTION);
      await collection.createIndex({ id: 1 });
      await collection.createIndex({ customerLoyaltyProgramType: 1 });

      console.log(
        `Collection, Schema Validator and Indexes for ${MARKETING_COLLECTION} successfully created.`,
      );
    } else {
      console.log(`Collection ${MARKETING_COLLECTION} already exists`);
    }
    console.log(`Ended migrating create-marketing-collection`);
  } catch (error) {
    console.error(`Failed to migrate create-marketing-collection:`, error);
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

export async function down(): Promise<void> {
  try {
    const db = await getDB();

    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(
      (c) => c.name === MARKETING_COLLECTION,
    );

    if (collectionExists) {
      const count = await db.collection(MARKETING_COLLECTION).countDocuments();
      if (count === 0) {
        console.log(`Started reverting ${MARKETING_COLLECTION}`);
        await db.dropCollection(MARKETING_COLLECTION);
        console.log(`Ended reverting ${MARKETING_COLLECTION}`);
      } else {
        console.log(
          `Collection ${MARKETING_COLLECTION} has data, it will not be dropped.`,
        );
      }
    }
  } catch (error) {
    console.error(`Failed to revert create-marketing-collection:`, error);
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

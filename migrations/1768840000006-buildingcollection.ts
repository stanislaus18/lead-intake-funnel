import { MongoClient } from 'mongodb';

const BUILDINGS_COLLECTION = 'buildings';
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
    console.log(`Started migrating create-buildings-collection`);

    const buildingsSchema = {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'Buildings Object Validation',
          required: ['id', 'createdAt'],
          properties: {
            _id: { bsonType: 'objectId' },
            id: {
              bsonType: 'string',
              description: "'id' must be a string and is required",
            },
            version: {
              bsonType: 'string',
              description: "'version' must be a string",
            },
            leadId: {
              bsonType: 'string',
              description: "'leadId' must be a string",
            },
            type: {
              bsonType: 'string',
              description: "'type' must be a string",
            },
            addressId: {
              bsonType: 'string',
              description: "'addressId' must be a string",
            },
            buildingInformationId: {
              bsonType: 'string',
              description: "'buildingInformationId' must be a string",
            },
            ownershipRelationshipsId: {
              bsonType: 'string',
              description: "'ownershipRelationshipsId' must be a string",
            },
            energyRelevantInformationId: {
              bsonType: 'string',
              description: "'energyRelevantInformationId' must be a string",
            },
            hotWaterId: {
              bsonType: 'string',
              description: "'hotWaterId' must be a string",
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
      (c) => c.name === BUILDINGS_COLLECTION,
    );

    if (!collectionExists) {
      await db.createCollection(BUILDINGS_COLLECTION, buildingsSchema);
      console.log(
        `Collection and Validation for ${BUILDINGS_COLLECTION} successfully created.`,
      );

      const collection = db.collection(BUILDINGS_COLLECTION);
      await collection.createIndex({ id: 1 });
      await collection.createIndex({ leadId: 1 });
      await collection.createIndex({ type: 1 });

      console.log(
        `Collection, Schema Validator and Indexes for ${BUILDINGS_COLLECTION} successfully created.`,
      );
    } else {
      console.log(`Collection ${BUILDINGS_COLLECTION} already exists`);
    }
    console.log(`Ended migrating create-buildings-collection`);
  } catch (error) {
    console.error(`Failed to migrate create-buildings-collection:`, error);
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
      (c) => c.name === BUILDINGS_COLLECTION,
    );

    if (collectionExists) {
      const count = await db.collection(BUILDINGS_COLLECTION).countDocuments();
      if (count === 0) {
        console.log(`Started reverting ${BUILDINGS_COLLECTION}`);
        await db.dropCollection(BUILDINGS_COLLECTION);
        console.log(`Ended reverting ${BUILDINGS_COLLECTION}`);
      } else {
        console.log(
          `Collection ${BUILDINGS_COLLECTION} has data, it will not be dropped.`,
        );
      }
    }
  } catch (error) {
    console.error(`Failed to revert create-buildings-collection:`, error);
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

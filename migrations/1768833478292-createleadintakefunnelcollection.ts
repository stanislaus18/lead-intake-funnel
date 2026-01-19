import { MongoClient } from 'mongodb';

const LEAD_INTAKE_FUNNEL_COLLECTION = 'lead-intake-funnel';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://root:root@localhost:27017/lead_intake_funnel?authSource=admin';

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
    console.log(`Started migrating create-lead-intake-funnel-collection`);

    const leadIntakeFunnelSchema = {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'Lead Intake Funnel Object Validation',
          required: ['id', 'version', 'contactId', 'createdAt'],
          properties: {
            id: {
              bsonType: 'string',
              description: "'id' must be a string and is required",
            },
            version: {
              bsonType: 'string',
              description: "'version' must be a string and is required",
            },
            contactId: {
              bsonType: 'string',
              description: "'contactId' must be a string and is required",
            },
            buildingId: {
              bsonType: 'string',
              description: "'buildingId' must be a string",
            },
            heatingSystemId: {
              bsonType: 'string',
              description: "'heatingSystemId' must be a string",
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
    const collectionExists = collections.some(c => c.name === LEAD_INTAKE_FUNNEL_COLLECTION);

    if (!collectionExists) {
      await db.createCollection(LEAD_INTAKE_FUNNEL_COLLECTION, leadIntakeFunnelSchema);
      console.log(`Collection and Validation for ${LEAD_INTAKE_FUNNEL_COLLECTION} successfully created.`);

      const collection = db.collection(LEAD_INTAKE_FUNNEL_COLLECTION);
      await collection.createIndex({ id: 1 });
      await collection.createIndex({ contactId: 1, buildingId: 1, createdAt: -1 });

      console.log(
        `Collection, Schema Validator and Indexes for ${LEAD_INTAKE_FUNNEL_COLLECTION} successfully created.`,
      );
    } else {
      console.log(`Collection ${LEAD_INTAKE_FUNNEL_COLLECTION} already exists`);
    }
    console.log(`Ended migrating create-lead-intake-funnel-collection`);
  } catch (error) {
    console.error(`Failed to migrate create-lead-intake-funnel-collection:`, error);
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
    const collectionExists = collections.some(c => c.name === LEAD_INTAKE_FUNNEL_COLLECTION);

    if (collectionExists) {
      const count = await db.collection(LEAD_INTAKE_FUNNEL_COLLECTION).countDocuments();
      if (count === 0) {
        console.log(`Started reverting ${LEAD_INTAKE_FUNNEL_COLLECTION}`);
        await db.dropCollection(LEAD_INTAKE_FUNNEL_COLLECTION);
        console.log(`Ended reverting ${LEAD_INTAKE_FUNNEL_COLLECTION}`);
      } else {
        console.log(`Collection ${LEAD_INTAKE_FUNNEL_COLLECTION} has data, it will not be dropped.`);
      }
    }
  } catch (error) {
    console.error(`Failed to revert create-lead-intake-funnel-collection:`, error);
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}



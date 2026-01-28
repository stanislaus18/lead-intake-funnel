import { MongoClient } from 'mongodb';

const ADDRESS_COLLECTION = 'addresses';
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
    console.log(`Started migrating create-address-collection`);

    const addressSchema = {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'Address Object Validation',
          required: ['id', 'createdAt'],
          properties: {
            id: {
              bsonType: 'string',
              description: "'id' must be a string and is required",
            },
            street: {
              bsonType: 'string',
              description: "'street' must be a string",
            },
            houseNumber: {
              bsonType: 'string',
              description: "'houseNumber' must be a string",
            },
            city: {
              bsonType: 'string',
              description: "'city' must be a string",
            },
            postalcode: {
              bsonType: 'string',
              description: "'postalcode' must be a string",
            },
            countryCode: {
              bsonType: 'string',
              description:
                "'countryCode' must be a string (ISO Country Code, e.g. 'DE')",
            },
            addressAddition: {
              bsonType: 'string',
              description:
                "'addressAddition' must be a string (e.g. '1. Etage')",
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
      (c) => c.name === ADDRESS_COLLECTION,
    );

    if (!collectionExists) {
      await db.createCollection(ADDRESS_COLLECTION, addressSchema);
      console.log(
        `Collection and Validation for ${ADDRESS_COLLECTION} successfully created.`,
      );

      const collection = db.collection(ADDRESS_COLLECTION);
      await collection.createIndex({ id: 1 });
      await collection.createIndex({ postalcode: 1 });

      console.log(
        `Collection, Schema Validator and Indexes for ${ADDRESS_COLLECTION} successfully created.`,
      );
    } else {
      console.log(`Collection ${ADDRESS_COLLECTION} already exists`);
    }
    console.log(`Ended migrating create-address-collection`);
  } catch (error) {
    console.error(`Failed to migrate create-address-collection:`, error);
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
      (c) => c.name === ADDRESS_COLLECTION,
    );

    if (collectionExists) {
      const count = await db.collection(ADDRESS_COLLECTION).countDocuments();
      if (count === 0) {
        console.log(`Started reverting ${ADDRESS_COLLECTION}`);
        await db.dropCollection(ADDRESS_COLLECTION);
        console.log(`Ended reverting ${ADDRESS_COLLECTION}`);
      } else {
        console.log(
          `Collection ${ADDRESS_COLLECTION} has data, it will not be dropped.`,
        );
      }
    }
  } catch (error) {
    console.error(`Failed to revert create-address-collection:`, error);
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

import { MongoClient } from 'mongodb';

const CONTACT_COLLECTION = 'contact';
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
    console.log(`Started migrating create-contact-collection`);

    const contactSchema = {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'Create Contact Object Validation',
          required: ['id', 'contactInformation', 'createdAt'],
          properties: {
            id: {
              bsonType: 'string',
              description: "'id' must be a string and is required",
            },
            contactInformation: {
              bsonType: 'object',
              required: [
                'salutation',
                'firstName',
                'lastName',
                'phone',
                'email',
                'newsletterSingleOptIn',
              ],
              properties: {
                salutation: {
                  bsonType: 'string',
                  description:
                    "'salutation' must be a string, will store Mann, FRAU, Divers",
                },
                firstName: {
                  bsonType: 'string',
                  description: "'firstName' must be a string",
                },
                lastName: {
                  bsonType: 'string',
                  description: "'lastName' must be a string",
                },
                phone: {
                  bsonType: 'string',
                  description: "'lastName' must be a string",
                },
                email: {
                  bsonType: 'string',
                  description: "'email' must be a string",
                },
                newsletterSingleOptIn: {
                  bsonType: 'string',
                  description: "'newsletterSingleOptIn' must be a string",
                },
              },
            },
            address: {
              bsonType: 'object',
              required: ['id'],
              properties: {
                id: {
                  bsonType: 'string',
                  description: "'id' must be a string and is required",
                },
                street: {
                  bsonType: 'string',
                  description: "'street' must be a string",
                },
                city: {
                  bsonType: 'string',
                  description: "'firstName' must be a string",
                },
                postalCode: {
                  bsonType: 'string',
                  description: "'postalCode' must be a string",
                },
                countryCode: {
                  bsonType: 'string',
                  description: "'countryCode' must be a string",
                },
                addressAddition: {
                  bsonType: 'string',
                  description: "'addressAddition' must be a string",
                },
              },
            },
            marketing: {
              bsonType: 'object',
              required: ['id'],
              properties: {
                id: {
                  bsonType: 'string',
                  description: "'id' must be a string and is required",
                },
                customerLoyaltyProgramType: {
                  bsonType: 'string',
                  description: "'customerLoyaltyProgramType' must be a string",
                },
                customerLoyaltyProgramId: {
                  bsonType: 'string',
                  description: "'customerLoyaltyProgramId' must be a string",
                },
              },
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
      (c) => c.name === CONTACT_COLLECTION,
    );

    if (!collectionExists) {
      await db.createCollection(CONTACT_COLLECTION, contactSchema);
      console.log(
        `Collection and Validation for ${CONTACT_COLLECTION} successfully created.`,
      );
      const collection = db.collection(CONTACT_COLLECTION);
      await collection.createIndex({ id: 1 });
      await collection.createIndex({
        contactId: 1,
        buildingId: 1,
        createdAt: -1,
      });

      console.log(
        `Collection, Schema Validator and Indexes for ${CONTACT_COLLECTION} successfully created.`,
      );
    } else {
      console.log(`Collection ${CONTACT_COLLECTION} already exists`);
    }
    console.log(`Ended migrating create-contact-collection`);
  } catch (error) {
    console.error(`Failed to migrate create-contact-collection:`, error);
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
      (c) => c.name === CONTACT_COLLECTION,
    );

    if (collectionExists) {
      const count = await db.collection(CONTACT_COLLECTION).countDocuments();
      if (count === 0) {
        console.log(`Started reverting ${CONTACT_COLLECTION}`);
        await db.dropCollection(CONTACT_COLLECTION);
        console.log(`Ended reverting ${CONTACT_COLLECTION}`);
      } else {
        console.log(
          `Collection ${CONTACT_COLLECTION} has data, it will not be dropped.`,
        );
      }
    }
  } catch (error) {
    console.error(`Failed to revert create-contact-collection:`, error);
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

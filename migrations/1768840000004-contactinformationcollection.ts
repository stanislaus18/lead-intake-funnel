import { MongoClient } from 'mongodb';

const CONTACT_INFORMATION_COLLECTION = 'contact-information';
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
    console.log(`Started migrating create-contact-information-collection`);

    const contactInformationSchema = {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'Contact Information Object Validation',
          required: [
            'id',
            'firstName',
            'lastName',
            'email',
            'phone',
            'createdAt',
          ],
          properties: {
            id: {
              bsonType: 'string',
              description:
                "'id' must be a string and is required, Possible choices: Frau, Mann, Divers",
            },
            salutation: {
              bsonType: 'string',
              description: "'salutation' must be a string",
            },
            firstName: {
              bsonType: 'string',
              description: "'firstName' must be a string and is required",
            },
            lastName: {
              bsonType: 'string',
              description: "'lastName' must be a string and is required",
            },
            email: {
              bsonType: 'string',
              description: "'email' must be a string and is required",
            },
            phone: {
              bsonType: 'string',
              description:
                "'phone' must be a string and is required, Required. String Phone Number with Country Code",
            },
            newsletterSingleOptIn: {
              bsonType: 'bool',
              description: "'newsletterSingleOptIn' must be a boolean",
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
      (c) => c.name === CONTACT_INFORMATION_COLLECTION,
    );

    if (!collectionExists) {
      await db.createCollection(
        CONTACT_INFORMATION_COLLECTION,
        contactInformationSchema,
      );
      console.log(
        `Collection and Validation for ${CONTACT_INFORMATION_COLLECTION} successfully created.`,
      );

      const collection = db.collection(CONTACT_INFORMATION_COLLECTION);
      await collection.createIndex({ id: 1 });
      await collection.createIndex({ email: 1 });

      console.log(
        `Collection, Schema Validator and Indexes for ${CONTACT_INFORMATION_COLLECTION} successfully created.`,
      );
    } else {
      console.log(
        `Collection ${CONTACT_INFORMATION_COLLECTION} already exists`,
      );
    }
    console.log(`Ended migrating create-contact-information-collection`);
  } catch (error) {
    console.error(
      `Failed to migrate create-contact-information-collection:`,
      error,
    );
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
      (c) => c.name === CONTACT_INFORMATION_COLLECTION,
    );

    if (collectionExists) {
      const count = await db
        .collection(CONTACT_INFORMATION_COLLECTION)
        .countDocuments();
      if (count === 0) {
        console.log(`Started reverting ${CONTACT_INFORMATION_COLLECTION}`);
        await db.dropCollection(CONTACT_INFORMATION_COLLECTION);
        console.log(`Ended reverting ${CONTACT_INFORMATION_COLLECTION}`);
      } else {
        console.log(
          `Collection ${CONTACT_INFORMATION_COLLECTION} has data, it will not be dropped.`,
        );
      }
    }
  } catch (error) {
    console.error(
      `Failed to revert create-contact-information-collection:`,
      error,
    );
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

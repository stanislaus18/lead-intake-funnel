import { MongoClient } from 'mongodb';

const BUILDING_INFORMATION_COLLECTION = 'building-information';
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
    console.log(`Started migrating create-building-information-collection`);

    const buildingInformationSchema = {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'Building Information Object Validation',
          required: ['id', 'createdAt'],
          properties: {
            id: {
              bsonType: 'string',
              description: "'id' must be a string and is required",
            },
            immoType: {
              bsonType: 'string',
              description: "'immoType' must be a string",
            },
            heritageProtection: {
              bsonType: 'string',
              description: "'heritageProtection' must be a string",
            },
            constructionYear: {
              bsonType: 'int',
              description: "'constructionYear' must be an integer",
            },
            livingSpace: {
              bsonType: 'number',
              description: "'livingSpace' must be a number",
            },
            constructionYearString: {
              bsonType: 'string',
              description: "'constructionYearString' must be a string",
            },
            residentialUnits: {
              bsonType: 'int',
              description: "'residentialUnits' must be an integer",
            },
            boilerRoomSize: {
              bsonType: 'string',
              description: "'boilerRoomSize' must be a string",
            },
            installationLocationCeilingHeight: {
              bsonType: 'string',
              description:
                "'installationLocationCeilingHeight' must be a string",
            },
            widthPathway: {
              bsonType: 'string',
              description: "'widthPathway' must be a string",
            },
            heightPathway: {
              bsonType: 'string',
              description: "'heightPathway' must be a string",
            },
            roomsBetweenHeatingRoomAndOutdoorUnit: {
              bsonType: 'string',
              description:
                "'roomsBetweenHeatingRoomAndOutdoorUnit' must be a string",
            },
            meterClosetLocation: {
              bsonType: 'string',
              description: "'meterClosetLocation' must be a string",
            },
            electricityConnectionLocation: {
              bsonType: 'string',
              description: "'electricityConnectionLocation' must be a string",
            },
            groundingType: {
              bsonType: 'string',
              description: "'groundingType' must be a string",
            },
            hasSolarThermalSystem: {
              bsonType: 'bool',
              description: "'hasSolarThermalSystem' must be a boolean",
            },
            personsHousehold: {
              bsonType: 'int',
              description: "'personsHousehold' must be an integer",
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
      (c) => c.name === BUILDING_INFORMATION_COLLECTION,
    );

    if (!collectionExists) {
      await db.createCollection(
        BUILDING_INFORMATION_COLLECTION,
        buildingInformationSchema,
      );
      console.log(
        `Collection and Validation for ${BUILDING_INFORMATION_COLLECTION} successfully created.`,
      );

      const collection = db.collection(BUILDING_INFORMATION_COLLECTION);
      await collection.createIndex({ id: 1 });
      await collection.createIndex({ immoType: 1 });

      console.log(
        `Collection, Schema Validator and Indexes for ${BUILDING_INFORMATION_COLLECTION} successfully created.`,
      );
    } else {
      console.log(
        `Collection ${BUILDING_INFORMATION_COLLECTION} already exists`,
      );
    }
    console.log(`Ended migrating create-building-information-collection`);
  } catch (error) {
    console.error(
      `Failed to migrate create-building-information-collection:`,
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
      (c) => c.name === BUILDING_INFORMATION_COLLECTION,
    );

    if (collectionExists) {
      const count = await db
        .collection(BUILDING_INFORMATION_COLLECTION)
        .countDocuments();
      if (count === 0) {
        console.log(`Started reverting ${BUILDING_INFORMATION_COLLECTION}`);
        await db.dropCollection(BUILDING_INFORMATION_COLLECTION);
        console.log(`Ended reverting ${BUILDING_INFORMATION_COLLECTION}`);
      } else {
        console.log(
          `Collection ${BUILDING_INFORMATION_COLLECTION} has data, it will not be dropped.`,
        );
      }
    }
  } catch (error) {
    console.error(
      `Failed to revert create-building-information-collection:`,
      error,
    );
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

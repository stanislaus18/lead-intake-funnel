import { MongoClient } from 'mongodb';

const HEATING_SYSTEM_COLLECTION = 'heating-system';
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
    console.log(`Started migrating create-heating-system-collection`);

    const heatingSystemSchema = {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'Create Heating System Object Validation',
          required: ['id', 'createdAt'],
          properties: {
            id: {
              bsonType: 'string',
              description: "'id' must be a string and is required",
            },
            consumption: {
              bsonType: 'int',
              description: "'consumption' must be an integer",
            },
            consumptionUnit: {
              bsonType: 'string',
              description: "'consumptionUnit' must be Liter (l) or Kilowattstunden (kWh)",
            },
            systemType: {
              bsonType: 'string',
              description: "'systemType' must be a string with heating system type",
            },
            constructionYearHeatingSystem: {
              bsonType: 'int',
              description: "'constructionYearHeatingSystem' must be an integer greater than 1500",
            },
            constructionYearHeatingSystemString: {
              bsonType: 'string',
              description: "'constructionYearHeatingSystemString' must be a string",
            },
            model: {
              bsonType: 'string',
              description: "'model' must be a string",
            },
            floorHeatingConnectedToReturnPipe: {
              bsonType: 'bool',
              description: "'floorHeatingConnectedToReturnPipe' must be a boolean",
            },
            floorHeatingOwnHeatingCircuit: {
              bsonType: 'bool',
              description: "'floorHeatingOwnHeatingCircuit' must be a boolean",
            },
            floorHeatingOnlyInSmallRooms: {
              bsonType: 'bool',
              description: "'floorHeatingOnlyInSmallRooms' must be a boolean",
            },
            numberOfFloorHeatingDistributors: {
              bsonType: 'int',
              description: "'numberOfFloorHeatingDistributors' must be an integer",
            },
            numberOfRadiators: {
              bsonType: 'int',
              description: "'numberOfRadiators' must be an integer",
            },
            domesticHotWaterByHeatpump: {
              bsonType: 'bool',
              description: "'domesticHotWaterByHeatpump' must be a boolean",
            },
            domesticHotWaterCirculationPump: {
              bsonType: 'string',
              description: "'domesticHotWaterCirculationPump' must be no, unknown, yes_but_inactive, or yes_and_active",
            },
            domestic_water_station: {
              bsonType: 'string',
              description: "'domestic_water_station' must be no, unknown, yes, or water_filter_and_pressure_reducer",
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
      (c) => c.name === HEATING_SYSTEM_COLLECTION,
    );

    if (!collectionExists) {
      await db.createCollection(HEATING_SYSTEM_COLLECTION, heatingSystemSchema);
      console.log(
        `Collection and Validation for ${HEATING_SYSTEM_COLLECTION} successfully created.`,
      );
      const collection = db.collection(HEATING_SYSTEM_COLLECTION);
      await collection.createIndex({ id: 1 });
      await collection.createIndex({
        leadId: 1,
        createdAt: -1,
      });

      console.log(
        `Collection, Schema Validator and Indexes for ${HEATING_SYSTEM_COLLECTION} successfully created.`,
      );
    } else {
      console.log(`Collection ${HEATING_SYSTEM_COLLECTION} already exists`);
    }
    console.log(`Ended migrating create-heating-system-collection`);
  } catch (error) {
    console.error(`Failed to migrate create-heating-system-collection:`, error);
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
      (c) => c.name === HEATING_SYSTEM_COLLECTION,
    );

    if (collectionExists) {
      const count = await db.collection(HEATING_SYSTEM_COLLECTION).countDocuments();
      if (count === 0) {
        console.log(`Started reverting ${HEATING_SYSTEM_COLLECTION}`);
        await db.dropCollection(HEATING_SYSTEM_COLLECTION);
        console.log(`Ended reverting ${HEATING_SYSTEM_COLLECTION}`);
      } else {
        console.log(
          `Collection ${HEATING_SYSTEM_COLLECTION} has data, it will not be dropped.`,
        );
      }
    }
  } catch (error) {
    console.error(`Failed to revert create-heating-system-collection:`, error);
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

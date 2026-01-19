import { MongoClient } from 'mongodb';

const BUILDING_COLLECTION = 'building';
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
    console.log(`Started migrating create-building-collection`);

    const buildingSchema = {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'Create Building Object Validation',
          required: ['id', 'leadId', 'address', 'buildingInformation'],
          properties: {
            id: {
              bsonType: 'string',
              description: "'id' must be a string and is required",
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
                  description: "'city' must be a string",
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
            buildingInformation: {
              bsonType: 'object',
              required: [],
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
                  description: "'heritageProtection' must be Ja or Nein",
                },
                constructionYear: {
                  bsonType: 'int',
                  description: "'constructionYear' must be an integer",
                },
                livingSpace: {
                  bsonType: 'int',
                  description: "'livingSpace' must be an integer",
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
                  description: "'widthPathway' must be Ja or Nein",
                },
                heightPathway: {
                  bsonType: 'string',
                  description: "'heightPathway' must be Ja or Nein",
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
                  description:
                    "'electricityConnectionLocation' must be a string",
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
              },
            },
            ownershipRelationships: {
              bsonType: 'object',
              required: ['id'],
              properties: {
                id: {
                  bsonType: 'string',
                  description: "'id' must be a string and is required",
                },
                ownershipRelationship: {
                  bsonType: 'string',
                  description: "'ownershipRelationship' must be a string",
                },
                ownershipRelationshipExplanation: {
                  bsonType: 'string',
                  description:
                    "'ownershipRelationshipExplanation' must be a string",
                },
                numberOfOwners: {
                  bsonType: 'int',
                  description: "'numberOfOwners' must be an integer",
                },
                ownerOccupiedHousing: {
                  bsonType: 'bool',
                  description: "'ownerOccupiedHousing' must be a boolean",
                },
                type: {
                  bsonType: 'string',
                  description: "'type' must be a string",
                },
              },
            },
            energyRelevantInformation: {
              bsonType: 'object',
              required: ['id'],
              properties: {
                id: {
                  bsonType: 'string',
                  description: "'id' must be a string and is required",
                },
                heatedArea: {
                  bsonType: 'int',
                  description: "'heatedArea' must be an integer",
                },
                heatedAreaString: {
                  bsonType: 'string',
                  description: "'heatedAreaString' must be a string",
                },
                typeOfHeating: {
                  bsonType: 'string',
                  description: "'typeOfHeating' must be a string",
                },
                locationHeating: {
                  bsonType: 'string',
                  description: "'locationHeating' must be a string",
                },
                apartmentHeatingSystem: {
                  bsonType: 'string',
                  description: "'apartmentHeatingSystem' must be Yes or No",
                },
              },
            },
            hotWater: {
              bsonType: 'object',
              required: ['id'],
              properties: {
                id: {
                  bsonType: 'string',
                  description: "'id' must be a string and is required",
                },
                numberOfBathtubs: {
                  bsonType: 'int',
                  description: "'numberOfBathtubs' must be an integer",
                },
                numberOfShowers: {
                  bsonType: 'int',
                  description: "'numberOfShowers' must be an integer",
                },
                typeOfShowers: {
                  bsonType: 'string',
                  description: "'typeOfShowers' must be a string",
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
      (c) => c.name === BUILDING_COLLECTION,
    );

    if (!collectionExists) {
      await db.createCollection(BUILDING_COLLECTION, buildingSchema);
      console.log(
        `Collection and Validation for ${BUILDING_COLLECTION} successfully created.`,
      );
      const collection = db.collection(BUILDING_COLLECTION);
      await collection.createIndex({ id: 1 });
      await collection.createIndex({
        leadId: 1,
        createdAt: -1,
      });

      console.log(
        `Collection, Schema Validator and Indexes for ${BUILDING_COLLECTION} successfully created.`,
      );
    } else {
      console.log(`Collection ${BUILDING_COLLECTION} already exists`);
    }
    console.log(`Ended migrating create-building-collection`);
  } catch (error) {
    console.error(`Failed to migrate create-building-collection:`, error);
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
      (c) => c.name === BUILDING_COLLECTION,
    );

    if (collectionExists) {
      const count = await db.collection(BUILDING_COLLECTION).countDocuments();
      if (count === 0) {
        console.log(`Started reverting ${BUILDING_COLLECTION}`);
        await db.dropCollection(BUILDING_COLLECTION);
        console.log(`Ended reverting ${BUILDING_COLLECTION}`);
      } else {
        console.log(
          `Collection ${BUILDING_COLLECTION} has data, it will not be dropped.`,
        );
      }
    }
  } catch (error) {
    console.error(`Failed to revert create-building-collection:`, error);
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

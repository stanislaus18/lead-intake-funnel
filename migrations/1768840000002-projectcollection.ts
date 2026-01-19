import { MongoClient } from 'mongodb';

const PROJECT_COLLECTION = 'project';
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
    console.log(`Started migrating create-project-collection`);

    const projectSchema = {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          title: 'Create Project Object Validation',
          required: ['id', 'leadId', 'createdAt'],
          properties: {
            id: {
              bsonType: 'string',
              description: "'id' must be a string and is required",
            },
            timeline: {
              bsonType: 'string',
              description:
                "'timeline' must be Sofort, 1-3 Monate, 3-6 Monate, or >6 Monate",
            },
            householdIncome: {
              bsonType: 'string',
              description:
                "'householdIncome' must be more_than_40k_gross, less_than_40k_gross, or no_answer",
            },
            statusOfFoundationConstruction: {
              bsonType: 'string',
              description:
                "'statusOfFoundationConstruction' must be Vamo, Kunde, or Kein Fundament notwendig",
            },
            infosLeadsource: {
              bsonType: 'string',
              description: "'infosLeadsource' must be a string",
            },
            fullReplacementOfHeatingSystemPlanned: {
              bsonType: 'bool',
              description:
                "'fullReplacementOfHeatingSystemPlanned' must be a boolean",
            },
            additionalDisposal: {
              bsonType: 'array',
              items: {
                bsonType: 'string',
              },
              description:
                "'additionalDisposal' must be an array of disposal type strings",
            },
            shouldKeepSolarThermalSystem: {
              bsonType: 'bool',
              description: "'shouldKeepSolarThermalSystem' must be a boolean",
            },
            pictures: {
              bsonType: 'object',
              required: ['id'],
              properties: {
                id: {
                  bsonType: 'string',
                  description: "'id' must be a string and is required",
                },
                outdoorUnitLocation: {
                  bsonType: 'array',
                  items: {
                    bsonType: 'object',
                    properties: {
                      url: {
                        bsonType: 'string',
                      },
                    },
                  },
                  description:
                    "'outdoorUnitLocation' must be an array of picture objects with url",
                },
                outdoorUnitLocationWithArea: {
                  bsonType: 'array',
                  items: {
                    bsonType: 'object',
                    properties: {
                      url: {
                        bsonType: 'string',
                      },
                    },
                  },
                  description:
                    "'outdoorUnitLocationWithArea' must be an array of picture objects with url",
                },
                heatingRoom: {
                  bsonType: 'array',
                  items: {
                    bsonType: 'object',
                    properties: {
                      url: {
                        bsonType: 'string',
                      },
                    },
                  },
                  description:
                    "'heatingRoom' must be an array of picture objects with url",
                },
                meterClosetWithDoorOpen: {
                  bsonType: 'array',
                  items: {
                    bsonType: 'object',
                    properties: {
                      url: {
                        bsonType: 'string',
                      },
                    },
                  },
                  description:
                    "'meterClosetWithDoorOpen' must be an array of picture objects with url",
                },
                meterClosetSlsSwitchDetailed: {
                  bsonType: 'array',
                  items: {
                    bsonType: 'object',
                    properties: {
                      url: {
                        bsonType: 'string',
                      },
                    },
                  },
                  description:
                    "'meterClosetSlsSwitchDetailed' must be an array of picture objects with url",
                },
                floorHeatingDistributionWithDoorOpen: {
                  bsonType: 'array',
                  items: {
                    bsonType: 'object',
                    properties: {
                      url: {
                        bsonType: 'string',
                      },
                    },
                  },
                  description:
                    "'floorHeatingDistributionWithDoorOpen' must be an array of picture objects with url",
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
      (c) => c.name === PROJECT_COLLECTION,
    );

    if (!collectionExists) {
      await db.createCollection(PROJECT_COLLECTION, projectSchema);
      console.log(
        `Collection and Validation for ${PROJECT_COLLECTION} successfully created.`,
      );
      const collection = db.collection(PROJECT_COLLECTION);
      await collection.createIndex({ id: 1 });
      await collection.createIndex({
        leadId: 1,
        createdAt: -1,
      });

      console.log(
        `Collection, Schema Validator and Indexes for ${PROJECT_COLLECTION} successfully created.`,
      );
    } else {
      console.log(`Collection ${PROJECT_COLLECTION} already exists`);
    }
    console.log(`Ended migrating create-project-collection`);
  } catch (error) {
    console.error(`Failed to migrate create-project-collection:`, error);
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
      (c) => c.name === PROJECT_COLLECTION,
    );

    if (collectionExists) {
      const count = await db.collection(PROJECT_COLLECTION).countDocuments();
      if (count === 0) {
        console.log(`Started reverting ${PROJECT_COLLECTION}`);
        await db.dropCollection(PROJECT_COLLECTION);
        console.log(`Ended reverting ${PROJECT_COLLECTION}`);
      } else {
        console.log(
          `Collection ${PROJECT_COLLECTION} has data, it will not be dropped.`,
        );
      }
    }
  } catch (error) {
    console.error(`Failed to revert create-project-collection:`, error);
    throw error;
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}

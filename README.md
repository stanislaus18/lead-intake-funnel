# Lead Intake Funnel

A modern web application for managing lead intake and qualification in the renewable energy sector. The application features a Vue.js frontend, NestJS backend, MongoDB database, and offline-first capabilities with IndexedDB and Service Workers.

## High level architectural diagram

![alt text](Architectural_diagram.png)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building](#building)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Database](#database)
- [File Upload](#file-upload)
- [Service Worker](#service-worker)

## Features

- **Lead Management**: Create, track, and qualify leads through a structured intake funnel
- **Multi-step Form**: User-friendly form with multiple sections for collecting lead information
- **Image Upload**: Support for multiple image uploads (profile photos, building photos, heating system photos, etc.)
- **Offline-First**: Works offline with IndexedDB for local storage
- **Background Sync**: Automatic image upload via Service Worker when connection is available
- **Real-time Validation**: Client-side and server-side validation
- **MongoDB Integration**: Persistent storage with MongoDB
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **API Documentation**: Auto-generated Swagger documentation

## Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **RxJS** - Reactive programming library
- **idb** - IndexedDB wrapper for offline storage

### Backend
- **NestJS** - Progressive Node.js framework
- **Mongoose** - MongoDB object modeling
- **MongoDB** - NoSQL database
- **Express** - Web server framework
- **RxJS** - Reactive programming with Observables
- **Class Validator** - DTO validation
- **UUID** - Unique identifier generation

### Tools & Libraries
- **Nx** - Monorepo management
- **Playwright** - E2E testing
- **Jest** - Unit testing
- **ESLint** - Code linting
- **OpenAPI** - API documentation

## Project Structure

```
lead-intake-funnel/
├── apps/
│   ├── backend/                    # NestJS API server
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── app.controller.ts      # API endpoints
│   │   │   │   ├── app.service.ts         # Business logic
│   │   │   │   ├── app.repository.ts      # Database operations
│   │   │   │   ├── entities/              # TypeORM entities
│   │   │   │   ├── dto/                   # Data transfer objects
│   │   │   │   └── file-upload-service.ts # File upload logic
│   │   │   └── main.ts
│   │   ├── jest.config.ts
│   │   └── tsconfig.json
│   ├── backend-e2e/                # E2E tests for backend
│   ├── frontend/                   # Vue.js application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/     # Vue components
│   │   │   │   ├── composables/    # Vue composables
│   │   │   │   ├── utility/        # Utility functions
│   │   │   │   ├── router/         # Vue Router setup
│   │   │   │   └── stores/         # State management
│   │   │   └── main.ts
│   │   ├── public/
│   │   │   └── sw.js              # Service Worker
│   │   └── vite.config.ts
│   └── frontend-e2e/              # E2E tests for frontend
├── migrations/                     # Database migrations
├── docker-compose.yml
├── Dockerfile
├── nx.json
└── package.json
```

## Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 8.x (or npm/yarn)
- **MongoDB** >= 5.x
- **Docker** (optional, for MongoDB)
- **Java JDK** (optional, for OpenAPI generator)

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd lead-intake-funnel
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Set up environment variables

Create `.env` file in the root directory:
```env
MONGO_DB=lead_intake_funnel
NODE_ENV=development
```

### 4. Start MongoDB and all services

**Using Docker Compose (Recommended)**
```bash
docker-compose up --build
```

This starts:
- MongoDB on port 27017
- Backend API on port 3000
- Frontend on port 4200

**Local MongoDB Setup (Alternative)**
```bash
# Install MongoDB locally, then start with:
mongosh mongodb://root:root@localhost:27017/lead_intake_funnel?authSource=admin
```

**Run database migrations**
```bash
pnpm nx run backend:migration:up
```

## Development

### Using Docker Compose (Recommended)
```bash
docker-compose up --build
```

This starts all services:
- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:4200
- **MongoDB**: mongodb://root:root@localhost:27017/lead_intake_funnel?authSource=admin

### Local Development (Without Docker)

**Start backend with watch mode**
```bash
pnpm nx serve backend
```

**Start frontend with watch mode**
```bash
pnpm nx serve frontend
```

**Start both in parallel**
```bash
pnpm dev
```

## Building

### Build frontend
```bash
pnpm nx build frontend
```

### Build backend
```bash
pnpm nx build backend
```

### Build both
```bash
pnpm build
```

## Testing

### Run backend tests
```bash
pnpm nx test backend
```

### Run frontend tests
```bash
pnpm nx test frontend
```

### Run E2E tests
```bash
pnpm nx e2e backend-e2e
pnpm nx e2e frontend-e2e
```

### Run tests in watch mode
```bash
pnpm nx test backend --watch
```

## API Documentation

### View Swagger UI
Start the backend and visit: `http://localhost:3000/api/docs`

## Database

### MongoDB Setup

**Connection String**
```
mongodb://root:root@localhost:27017/lead_intake_funnel?authSource=admin
```

**Default Credentials**
- Username: `root`
- Password: `root`

### Collections

- **leads** - Main lead records with all intake information
  - Stores contact information, building details, heating systems
  - Includes uploaded file references

### Running Migrations

```bash
# Run all pending migrations
pnpm nx run backend:migration:up

# View migration status
pnpm nx run backend:migration:show
```

## Architecture Pattern: DAO/Model/DTO/Repository/Service

The backend follows a 5-layer modular architecture for each entity:

### Entity Module Structure
```
modules/[entity-name]/
├── [entity].dao.ts          # Data Access Object (interface)
├── [entity].model.ts        # Mongoose schema
├── [entity].dto.ts          # Data Transfer Object with validation
├── create-[entity].dto.ts   # Creation-specific DTO
├── [entity].repository.ts   # Database operations
├── [entity].service.ts      # Business logic
└── [entity].module.ts       # NestJS module with DI
```

### Service Pattern (RxJS Observables)
All services follow a consistent pattern:

```typescript
@Injectable()
export class [Entity]Service {
  constructor(private readonly repository: [Entity]Repository) {}

  create(dao: [Entity]Dao): Observable<string> {
    return from(this.repository.create({
      ...dao,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })).pipe(map((result) => result.id));
  }

  findById(id: string): Observable<[Entity]Dao> {
    try {
      return this.repository.findById(id);
    } catch (error) {
      return of(null);
    }
  }

  update(id: string, partial: Partial<[Entity]Dao>): Observable<[Entity]Dao> {
    return from(this.repository.update(id, {
      ...partial,
      updatedAt: new Date(),
    }));
  }

  delete(id: string): Observable<any> {
    return from(this.repository.delete(id));
  }
}
```

## Entity Modules

The backend includes 14 entity modules for lead management:

1. **Contact** - Contact person information (orchestrates 3 child entities)
2. **Address** - Street address, postal code, country
3. **ContactInformation** - Email, phone, communication preferences
4. **Building** - Building metadata (orchestrates 5 child entities)
5. **BuildingInformation** - Building type, year, area
6. **OwnershipRelationships** - Ownership type and details
7. **EnergyRelevantInformation** - Energy consumption, efficiency
8. **HotWater** - Hot water system details
9. **HeatingSystem** - Heating system configuration and metrics
10. **Project** - Project timeline and installation options
11. **Pictures** - Collection of location-specific picture URLs
12. **PictureUrl** - Individual picture URL storage
13. **LeadResponse** - Lead stage and booking information
14. **LeadIntakeFunnel** - Root entity aggregating all lead data

### Enum Validation

Projects use enums for type-safe validation:

```typescript
// Example: DisposalTypeEnum for additionalDisposal
@IsEnum(DisposalTypeEnum, { each: true })
additionalDisposal: DisposalTypeEnum[];
```

## Repository Pattern

## File Upload

### How it works

1. **Frontend**: User uploads images in PersonsInfo component
2. **IndexedDB**: Images are stored locally with offline capability
3. **Service Worker**: Background sync triggers when online
4. **Backend**: Images are uploaded to MongoDB via file stream
5. **MongoDB**: File data is embedded in lead records

### Upload Flow

- User selects multiple images in PersonsInfo.vue
- Images are validated client-side (size, type)
- RxJS combineLatest manages concurrent uploads
- Service Worker handles background sync when offline
- Successfully uploaded image URLs are stored as string arrays in Pictures entity

## Service Worker

### Features

- Offline-first image storage with IndexedDB
- Automatic background sync with [Background Sync API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Sync_API)
- Automatic retry on connection restore
- Message-based communication with frontend

### Manual Trigger

If needed, you can manually trigger image upload:

```javascript
navigator.serviceWorker.ready.then(registration => {
  registration.active.postMessage({
    type: 'UPLOAD_IMAGES'
  });
});
```

## Frontend Components

### PersonsInfo.vue
Main multi-step form collecting lead information:
- Contact details (name, email, phone)
- Building information and selection
- Heating system configuration
- Project timeline and options
- Image uploads for 6 different locations
- Form validation with real-time feedback
- RxJS Observable-based image processing

### Key Features
- Progressive form with step indicators
- Image upload with preview grids
- Offline-first with IndexedDB caching
- Service Worker integration
- Reactive state management with Pinia

## Debugging

### Enable debug logs
```bash
DEBUG=* pnpm dev
```

### Check IndexedDB
Browser DevTools → Application → IndexedDB → offline-db

### Monitor Service Worker
Browser DevTools → Application → Service Workers

### View backend logs
```bash
docker-compose logs backend -f
```

### Check MongoDB data
```bash
docker exec -it lead-intake-funnel-mongo-1 mongosh -u root -p root lead_intake_funnel
```

## Common Issues & Solutions

### Docker Container Won't Start
- Ensure Docker Desktop is running
- Check ports 3000, 4200, 27017 are available
- Clear Docker cache: `docker system prune`

### MongoDB Connection Error
- Verify Docker Compose is running: `docker-compose ps`
- Check connection string matches: `mongodb://root:root@mongo:27017/lead_intake_funnel?authSource=admin`
- Ensure network exists: `docker network ls`

### Missing 'yargs' Module Error
- Rebuild Docker image: `docker-compose up --build`
- Ensure `pnpm install --frozen-lockfile --recursive` runs in Dockerfile

### Image Upload Fails
- Check browser DevTools → Console for errors
- Verify backend is running on port 3000
- Check Service Worker registration in DevTools
- Inspect network requests for API errors

### API Endpoint Not Found (404)
- Verify lead-intake-funnel controller is mounted in app.module
- Check NestJS routing with `npx nx show project backend`
- Ensure database migrations have run: `pnpm nx run backend:migration:show`

## API Documentation

View auto-generated Swagger documentation when backend is running:

```
http://localhost:3000/api/docs
```

Endpoints are organized by entity:
- `/api/contact` - Contact management
- `/api/building` - Building information
- `/api/heating-system` - Heating system
- `/api/project` - Project details
- `/api/pictures` - Picture collections
- `/api/lead-intake-funnel` - Lead management

## Testing

### Run backend tests
```bash
pnpm nx test backend
```

### Run backend with coverage
```bash
pnpm nx test backend --coverage
```

### Run E2E tests
```bash
pnpm nx e2e backend-e2e
pnpm nx e2e frontend-e2e
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes following existing patterns
3. Run tests: `pnpm test`
4. Run migrations: `pnpm nx run backend:migration:up`
5. Commit with clear messages
6. Push and create pull request

## License

Proprietary - Vamo Energy

## Support

For issues and questions, contact the development team.

## Additional Resources

### Nx Documentation
- [Run tasks](https://nx.dev/features/run-tasks)
- [Generators](https://nx.dev/features/generate-code)

### Technology Docs
- [NestJS](https://docs.nestjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Vue 3](https://vuejs.org/)
- [RxJS](https://rxjs.dev/)

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve backend
```

To create a production bundle:

```sh
npx nx build backend
```

To see all available targets to run for a project, run:

```sh
npx nx show project backend
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/nest:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/nest?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

`
navigator.serviceWorker.ready.then(registration => {
  registration.active.postMessage({
    type: 'UPLOAD_IMAGES',
    foo: 'bar'
  })
})
`
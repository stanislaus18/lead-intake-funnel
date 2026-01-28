# Lead Intake Funnel

A modern web application for managing lead intake and qualification in the renewable energy sector. The application features a Vue.js frontend, NestJS backend, MongoDB database, and offline-first capabilities with IndexedDB and Service Workers.

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
- **TypeORM** - ORM for database operations
- **MongoDB** - NoSQL database
- **Express** - Web server framework
- **Multer** - File upload middleware

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

### 4. Start MongoDB

**Option A: Using Docker Compose**
```bash
docker-compose up -d
```

**Option B: Local MongoDB**
Ensure MongoDB is running locally on `mongodb://localhost:27017`

## Development

### Start both frontend and backend

```bash
pnpm dev
```

Or start them individually:

**Frontend (Vue.js on port 4200)**
```bash
pnpm frontend
```

**Backend (NestJS on port 3000)**
```bash
pnpm backend
```

### Watch mode for backend
```bash
pnpm nx build backend --watch
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
pnpm nx run backend:migration:run
```

## File Upload

### How it works

1. **Frontend**: User uploads images in PersonsInfo component
2. **IndexedDB**: Images are stored locally in IndexedDB
3. **Service Worker**: Background sync triggers when online
4. **Backend**: Images are uploaded to the server via `/api/lead-intake-funnel/upload`
5. **MongoDB**: File references are stored in lead records

### Upload Endpoint

**POST** `/api/lead-intake-funnel/upload`

**Request (FormData)**
```
- id: string (database record ID)
- file: File (binary file data)
```

**Response**
```json
{
  "message": "File uploaded successfully",
  "id": "abc123..."
}
```

## Service Worker

### Features

- Offline image storage
- Background sync using Background Sync API
- Automatic retry on connection restore
- Message-based communication with frontend

### Manual Upload Trigger

```javascript
navigator.serviceWorker.ready.then(registration => {
  registration.active.postMessage({
    type: 'UPLOAD_IMAGES'
  });
});
```

### Background Sync Registration

The Service Worker automatically registers a background sync tag `'upload-images'` when images need uploading.

## Repository Pattern

The repository pattern is used for all database operations:

```typescript
// In app.repository.ts
- createLead(leadData): Promise<any>
- findLeadById(id: string): Promise<any>
- findAllLeads(): Promise<any[]>
- updateLead(id: string, leadData): Promise<any>
- deleteLead(id: string): Promise<boolean>
- addFileToLead(leadId: string, fileId: string, fileType: string): Promise<any>
- getLeadFiles(leadId: string): Promise<any[]>
```

## Key Components

### PersonsInfo.vue
Main form component that collects lead information and handles image uploads. Features:
- Multi-field form validation
- Image upload with preview
- Real-time error feedback
- IndexedDB integration

### ImageUpload.vue
Reusable child component for image uploads:
- Multiple file selection
- Image previews in grid layout
- Individual remove functionality
- Upload state management

### UploadDBService
IndexedDB service for offline storage:
- Image saving and retrieval
- Offline queue management
- Sync status tracking

## Debugging

### Enable debug logs
Set `DEBUG=*` environment variable:
```bash
DEBUG=* pnpm dev
```

### Check IndexedDB
Open browser DevTools → Application → IndexedDB → offline-db

### Monitor Service Worker
DevTools → Application → Service Workers

## Common Issues & Solutions

### MongoDB Connection Error
- Ensure MongoDB is running: `docker-compose up -d`
- Check connection string in `app.module.ts`

### Image Upload Fails
- Check Service Worker registration
- Verify backend API endpoint is accessible
- Check browser console for errors

### TypeORM Entity Not Found
- Ensure entity is imported in `app.module.ts`
- Verify entity file location and naming

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `pnpm test`
4. Commit with clear messages
5. Submit pull request

## License

Proprietary - Vamo Energy

## Support

For issues and questions, contact the development team.

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
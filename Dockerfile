FROM node:20-alpine AS base

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy lockfile and package files
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile --recursive

# Copy entire project
COPY . .

# Backend stage
FROM base AS backend

EXPOSE 3000

CMD ["pnpm", "nx","serve","backend"]

# Frontend stage
FROM base AS frontend

EXPOSE 4200

CMD ["pnpm", "nx","serve","frontend"]

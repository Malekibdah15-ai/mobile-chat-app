# Use the official Bun image
FROM oven/bun:latest

WORKDIR /app

# Build web frontend
COPY web/package.json web/bun.lock* ./web/
RUN bun install --cwd ./web --frozen-lockfile
COPY web/ ./web/
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN bun --cwd ./web run build

# Install backend dependencies
COPY backend/package.json backend/bun.lock* ./backend/
RUN bun install --cwd ./backend --frozen-lockfile
COPY backend/ ./backend/

# Expose port
EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

# Start backend
CMD ["bun", "--cwd", "./backend", "index.ts"]
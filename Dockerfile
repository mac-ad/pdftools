# Use a Node.js base image
FROM node:alpine AS builder

WORKDIR /app

# copy package.json and package-lock.json into app directory
COPY package.json ./
RUN npm install -g pnpm && pnpm install

# copy rest to the app
COPY . .

# build nextjs app
RUN pnpm run build

# Production image
FROM node:alpine AS runner
WORKDIR /app

# copy build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install pnpm and only production dependencies
RUN npm install -g pnpm && pnpm install --production --frozen-lockfile

EXPOSE 3000

CMD ["pnpm", "start"]

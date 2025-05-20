# Production Dockerfile  code below for building and running the frontend application
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

########## Uncomment below if you want to run the frontend in development mode (For hot reload) ##########

# FROM node:18-alpine

# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install

# COPY . .

# EXPOSE 5173

# CMD ["npm", "run", "dev"]
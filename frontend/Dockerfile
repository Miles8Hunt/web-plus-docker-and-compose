FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . ./
RUN npm run build

FROM nginx:alpine AS production
WORKDIR /app
COPY --from=builder /app/build /usr/share/nginx/html/
COPY ./nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

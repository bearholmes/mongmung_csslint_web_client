FROM node:20-alpine AS builder
WORKDIR /app

# API URL build argument allows injecting environment-specific backend endpoint.
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL:-/api}
ENV NODE_OPTIONS="--max-old-space-size=1024"

# 종속성 먼저 설치 (npm 사용)
COPY package.json package-lock.json* ./
RUN npm ci --no-fund --no-audit --registry=https://registry.npmjs.org --legacy-peer-deps

# 소스 복사
COPY . .

# 빌드
RUN npm run build

FROM nginx:stable-alpine AS production
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

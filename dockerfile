FROM node:20-alpine AS builder
WORKDIR /app

# API URL build argument allows injecting environment-specific backend endpoint.
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL:-/api}

# 종속성 먼저 설치 (캐싱 활용)
RUN corepack enable && corepack prepare pnpm@9 --activate
# 네이티브 모듈 빌드 스크립트 허용 (pnpm 9+ 기본 차단 대응)
RUN pnpm config set allow-scripts '["@biomejs/biome","@parcel/watcher","@swc/core","esbuild"]'
# 빌드 스크립트 사전 승인
RUN pnpm approve-builds @biomejs/biome @parcel/watcher @swc/core esbuild
COPY package.json pnpm-lock.yaml ./
ENV NODE_OPTIONS="--max-old-space-size=1024"
RUN pnpm install --frozen-lockfile --reporter=append-only --child-concurrency=2 --network-timeout=600000 --registry=https://registry.npmjs.org

# 소스 복사
COPY . .

# 메모리 제한 설정을 명시적으로 추가
# 빌드
RUN pnpm run build

FROM nginx:stable-alpine AS production
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

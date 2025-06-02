# 1단계: Vite 빌드
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

# 2단계: nginx로 정적 파일 서빙
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000  # ✅ 여기 3000으로 변경
CMD ["nginx", "-g", "daemon off;"]

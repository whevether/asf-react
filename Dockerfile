FROM node:20.3.1 as builder
WORKDIR /app
COPY package*.json ./
COPY .eslintrc ./
COPY .babelrc ./
COPY tools tools/
RUN npm install
COPY src src/
COPY webpack.config.js ./
COPY webpack.config.prod.js ./
RUN npm run build
### STAGE 2: Production Environment ###
FROM nginx:1.25.1
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
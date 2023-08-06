FROM node:20-alpine 

WORKDIR /app

COPY ./Client .

RUN npm ci 

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD [ "npx", "serve", "dist" ]

FROM node:8

ARG NODE_ENV=production

ENV NODE_ENV=production
ENV PORT=8080

# npm install
ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json

RUN cd /tmp && npm install

RUN mkdir -p /opt/app-root && cp -a /tmp/node_modules /opt/app-root/

WORKDIR /opt/app-root/
COPY . .

RUN npm rebuild node-sass --force
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
